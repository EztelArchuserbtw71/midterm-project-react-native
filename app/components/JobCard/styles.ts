import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  tile: {
    borderRadius: 14,
    padding: 16,
    paddingBottom: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  logo: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
  },

  company: {
    fontSize: 14,
    marginVertical: 2,
  },

  salary: {
    fontSize: 14,
    fontWeight: '600',
  },

  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 6,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },

  bookmarkBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});