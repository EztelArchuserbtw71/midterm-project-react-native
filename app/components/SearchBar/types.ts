export interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
}