import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import {Formik} from 'formik';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {ArrowBAckIcon, GroupSettingIcon} from '../../assets/svgImg/SvgImg';
import InputField from '../../component/CustomInput/InputField';
import AppText from '../../component/AppText/AppText';
import {COLORS, ms} from '../../style';
import SubmitButton from '../../component/ButtonCotainer/SubmitButton';
import {styles} from './styles';
import { GroupNamevalidationSchema } from '../../utils/Schema';

type CreateGroupProps = {
  navigation: any;
};

const CreateGroup = ({navigation}: CreateGroupProps) => {
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
  };

  const handleSheetChanges = (index:any) => {
    
  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
      <SafeAreaView />
        <Formik
          initialValues={{name: ''}}
          validationSchema={GroupNamevalidationSchema}
          onSubmit={values => {
            
            navigation.replace('Description', {name: values?.name});
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={[styles.container]}>
              <View style={styles.mainContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingVertical: 15, paddingRight: 15}}>
                    <ArrowBAckIcon />
                  </TouchableOpacity>
                  <AppText
                    size={20}
                    color={COLORS.white}
                    family="PoppinsSemiB"
                    horizontal={10}>
                    Create Group
                  </AppText>
                </View>
                <View style={{marginTop: 30}}>
                  <InputField
                    value={values.name}
                    setValue={handleChange('name')}
                    secure={false}
                    formikValue={touched.name}
                    formikError={errors.name}
                    name={'Name your group'}
                  />
                  {errors.name && touched.name && (
                    <AppText
                      size={12}
                      color={COLORS.orangelight}
                      family="PoppinsMedium"
                      align="right">
                      {errors.name}*
                    </AppText>
                  )}
                </View>
               
              </View>
              <View style={{marginHorizontal: ms(2), marginVertical: ms(5)}}>
                <SubmitButton
                  title={'Create Group'}
                  pressing={handleSubmit}
                  colorChange={values.name == '' ? '#2B4050' : null}
                  colortext={values.name == '' ? '#758FA4' : null}
                  widthOf={'98%'}
                />
              </View>
            </View>
          )}
        </Formik>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={['25%', '50%']}
          onChange={handleSheetChanges}>
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default CreateGroup;
