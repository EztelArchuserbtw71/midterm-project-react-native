import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

  container:
      {flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0},

  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18
  },

  headerLeft: {flexDirection: 'row', alignItems: 'center'},

  headerTitle: {fontSize: 22, fontWeight: '700', marginLeft: 6},

  jobCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 14,
    margin: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2
  },

  logo: {width: 70, height: 70, borderRadius: 12, marginRight: 12},

  title: {fontSize: 18, fontWeight: '700'},

  company: {fontSize: 14, marginVertical: 2},

  salary: {fontSize: 14, fontWeight: '600'},

  meta: {fontSize: 12, marginTop: 4},

  form: {paddingHorizontal: 16},

  label: {fontSize: 14, marginBottom: 6, marginTop: 10, fontWeight: '600'},

  input: {borderWidth: 1, borderRadius: 10, padding: 12, fontSize: 14},

  textarea: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    height: 120,
    textAlignVertical: 'top'
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 0.5
  },

  cancelBtn: {
    flex: 1,
    padding: 14,
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
  },

  cancelText: {fontWeight: '600', color: '#FFF'},

  submitBtn: {flex: 2, padding: 14, borderRadius: 10, alignItems: 'center'},

  submitText: {color: '#fff', fontWeight: '700'},

  success: {marginTop: 180, alignItems: 'center', padding: 20},

  successTitle: {fontSize: 22, fontWeight: '700', marginTop: 20},

  successText: {marginTop: 8, textAlign: 'center'},

  successBtn: {
    marginTop: 30,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10
  },

  successBtnText: {color: '#fff', fontWeight: '700'}

});