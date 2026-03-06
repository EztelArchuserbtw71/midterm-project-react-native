import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import uuid from "react-native-uuid";
import JobModal from "../components/JobModal/JobModal";
import ApplyModal from "../components/ApplyModal/ApplyModal";
import ToastContainer from "../components/Toast/ToastContainer";

export interface Job {
  uuid: string;

  title: string;
  mainCategory: string;
  companyName: string;
  companyLogo: string;
  jobType: string;
  workModel: string;
  seniorityLevel: string;

  minSalary: number | null;
  maxSalary: number | null;
  currency: string;

  locations: string[];
  tags: string[];

  description: string;
  pubDate: number;
  expiryDate: number;

  applicationLink: string;
  guid: string;
}

interface JobsApiResponse {
  total_count: number;
  jobs: Omit<Job, "uuid">[];
}

type AppContextType = {
  jobs: Job[];
  totalCount: number;
  loadingJobs: boolean;
  jobsError: string | null;
  reloadJobs: () => Promise<void>;

  currentJobUuid: string | null;
  applyJobUuid: string | null;
  openJob: (uuid: string) => void;
  closeJob: () => void;
  openApply: (uuid: string) => void;
  closeApply: () => void;

  savedJobUUIDs: string[];
  saveJob: (uuid: string) => void;
  removeJob: (uuid: string) => void;
  isJobSaved: (uuid: string) => boolean;
  clearAllSavedJobs: () => void;

  darkMode: boolean;
  toggleDarkMode: () => void;
  theme: {
    background: string;
    alt: string;
    card: string;
    text: string;
    border: string;
    primary: string;
    placeholder: string;
    inputBackground: string;
    cardText: string;
    headerTitle: string;
    headerBackground: string;
    toggleBackground: string;
    inputText: string;
    inputTextActual: string;
  };

  showToast: (message: string, duration?: number) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [jobsError, setJobsError] = useState<string | null>(null);

  const API_URL = "https://empllo.com/api/v1";

  const loadJobs = useCallback(async () => {
    try {
      setLoadingJobs(true);
      setJobsError(null);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data: JobsApiResponse = await response.json();

      const processedJobs: Job[] = (data.jobs || []).map((job) => ({
        ...job,
        uuid: uuid.v4().toString(),
      }));

      setJobs(processedJobs);
      setTotalCount(data.total_count || 0);
    } catch (err: any) {
      setJobsError(err?.message ?? "Unknown error occurred");
    } finally {
      setLoadingJobs(false);
    }
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const [currentJobUuid, setCurrentJobUuid] = useState<string | null>(null);
  const [applyJobUuid, setApplyJobUuid] = useState<string | null>(null);

  const openJob = (uuid: string) => setCurrentJobUuid(uuid);
  const closeJob = () => setCurrentJobUuid(null);

  const openApply = (uuid: string) => setApplyJobUuid(uuid);
  const closeApply = () => setApplyJobUuid(null);

  const [savedJobUUIDs, setSavedJobUUIDs] = useState<string[]>([]);

  const saveJob = (uuid: string) => {
    setSavedJobUUIDs((prev) => (prev.includes(uuid) ? prev : [...prev, uuid]));
    showToast("Job Saved!");
  };

  const removeJob = (uuid: string) => {
    setSavedJobUUIDs((prev) => prev.filter((id) => id !== uuid));
    showToast("Job Unsaved!");
  };

  const isJobSaved = (uuid: string) => savedJobUUIDs.includes(uuid);
  const clearAllSavedJobs = () => setSavedJobUUIDs([]);

  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const theme = {
    background: darkMode ? "#120f1b" : "#ffffff",
    alt: darkMode ? "#91b8ab0e" : "#ff48000a",
    card: darkMode ? "#15141f" : "#dddddd",
    text: darkMode ? "#F9FAFB" : "#111111",
    border: darkMode ? "#374151" : "#E5E7EB",
    primary: darkMode ? "#91dda8" : "#2d6941",
    placeholder: darkMode ? "#9CA3AF" : "#6B7280",
    inputText: darkMode ? "#b9b3ca" : "#ece3dd",
    inputTextActual: darkMode ? "#1f1c27" : "#ffffff",
    inputBackground: darkMode ? "#193a24" : "#2d6941",
    cardText: darkMode ? "#F9FAFB" : "#FFFFFF",
    headerTitle: darkMode ? "#ffffff" : "#ffffff",
    headerBackground: darkMode ? "#234e31" : "#327e4b",
    toggleBackground: darkMode ? "#F9FAFB" : "#F9FAFB",
  };

  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

  const showToast = (message: string, duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
    theme.inputBackground;
  };

  return (
    <AppContext.Provider
      value={{
        jobs,
        totalCount,
        loadingJobs,
        jobsError,
        reloadJobs: loadJobs,

        currentJobUuid,
        applyJobUuid,
        openJob,
        closeJob,
        openApply,
        closeApply,

        savedJobUUIDs,
        saveJob,
        removeJob,
        isJobSaved,
        clearAllSavedJobs,

        darkMode,
        toggleDarkMode,
        theme,

        showToast,
      }}
    >
      {children}

      {currentJobUuid && <JobModal jobUuid={currentJobUuid} />}
      {applyJobUuid && <ApplyModal jobUuid={applyJobUuid} />}

      <ToastContainer toasts={toasts} />
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
