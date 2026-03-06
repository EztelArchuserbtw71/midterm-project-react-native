import {StyleSheet} from 'react-native';

export const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginHorizontal: 9,
    marginBottom: 12,
    marginTop: -5,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },

  clearButton: {
    padding: 2,
  },
});