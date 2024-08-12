import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Animated,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';

import * as Yup from 'yup';
import AppText from '../../../component/AppText/AppText';
import CustomInput from './CustomInput';
import SubmitButton from '../../../component/ButtonCotainer/SubmitButton';
import { COLORS } from '../../../style';

// Define types for form values
interface AddressFormValues {
  address: string;
  address1: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
}

// Define types for validation errors
interface FormErrors {
  [key: string]: string;
}

// Define the type for AddressSheet props
interface AddressSheetProps {
  onSubmit: (addressData: AddressFormValues) => void;
  newaddress: AddressFormValues;
}

const validationSchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
  address1: Yup.string().required('Address line 1 is required'),
  city: Yup.string().required('City is required'),
  postalCode: Yup.string()
    .required('Pincode is required')
    .matches(/^\d{6}$/, 'Invalid pincode'),
  state: Yup.string().required('State is required'),
  country: Yup.string().required('Country is required'),
});

const AddressSheet: React.FC<AddressSheetProps> = ({onSubmit, newaddress}) => {
  const [formValues, setFormValues] = useState<AddressFormValues>({
    address: newaddress.address ?? '',
    address1: newaddress.address1 ?? '',
    city: newaddress.city ?? '',
    postalCode: newaddress.postalCode ?? '', // Ensure this line is correct
    state: newaddress.state ?? '',
    country: newaddress.country ?? '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = () => {
    try {
      validationSchema.validateSync(formValues, {abortEarly: false});
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: FormErrors = {};
        error.inner.forEach(err => {
          validationErrors[err.path || ''] = err.message;
        });
        setErrors(validationErrors);
      }
      return false;
    }
  };

  const handleSubmit = () => {
    try {
      if (validate()) {
        onSubmit(formValues);
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormValues(prev => ({...prev, [name]: value}));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView>
          <View style={{alignItems:"center",justifyContent:"center"}}>
            <AppText size={scale(18)} family="PoppinsSemiB">
              Address
            </AppText>
          </View>
          <View style={{marginVertical: 10}}>
            <CustomInput
              value={formValues.address}
              setValue={value => handleChange('address', value)}
              placeholder="Address"
              secure={false}
              formikError={errors.address}
            />
          </View>
          <CustomInput
            value={formValues.address1}
            setValue={value => handleChange('address1', value)}
            placeholder="Address Line 1"
            secure={false}
            formikError={errors.address1}
          />
          <View style={{marginVertical: 10}}>
            <CustomInput
              value={formValues.city}
              setValue={value => handleChange('city', value)}
              placeholder="City"
              secure={false}
              formikError={errors.city}
            />
          </View>
          <CustomInput
            value={formValues.postalCode}
            setValue={value => handleChange('postalCode', value)}
            placeholder="Pincode"
            secure={false}
            keyboard="numeric"
            formikError={errors.postalCode}
          />
          <View style={{marginVertical: 10}}>
            <CustomInput
              value={formValues.state}
              setValue={value => handleChange('state', value)}
              placeholder="State"
              secure={false}
              formikError={errors.state}
            />
          </View>
          <CustomInput
            value={formValues.country}
            setValue={value => handleChange('country', value)}
            placeholder="Country"
            secure={false}
            formikError={errors.country}
          />
          <View style={styles.submitbutton}>
            <SubmitButton
              title="Submit"
              widthOf={'100%'}
              pressing={handleSubmit}
            />
          </View>
        </KeyboardAvoidingView>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    marginBottom: moderateScale(30),
  },
  submitbutton: {
    height: '10%',
    backgroundColor: COLORS.white,
    width: '100%',
    marginVertical: 20,
  },
});

export default AddressSheet;
