import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  toast: {
    marginVertical: 4,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#7C3AED',
    borderRadius: 20,
  },
  toastText: {
    color: '#fff',
    fontWeight: '600',
  },
});