import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    padding: 16,
    justifyContent: 'flex-start',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backText: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 4,
  },
  jobHeader: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 0,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 16,
    marginRight: 16,
  },
  jobInfo: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  company: {
    fontSize: 16,
    marginBottom: 4,
  },
  salary: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  meta: {
    fontSize: 14,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 10,
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#111827',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  applyText: {
    color: '#fff',
    fontWeight: '600',
  },
});