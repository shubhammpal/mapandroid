import * as yup from 'yup'
export const LoginValidationSchema = yup.object().shape({
  mobileNumber: yup.string()
    .min(11, ({ min }) => `Please enter 10 digits mobile number`)
    .required('Mobile number is required')
    .matches(
      new RegExp(/^(?!\s)(?=.*[0-9])[0-9\s\+\(\)]*(?<!\s)$/),
      'Mobile number contains digits and special characters only, and cannot start or end with a space',
    ),
})
export const ModalValidationSchema = yup.object().shape({
  mobileNumber: yup.string()
    .min(10, ({ min }) => `Please enter 10 digits mobile number`)
    .required('Mobile number is required')
    .matches(
      new RegExp(/^(?!\s)(?=.*[0-9])[0-9\s\+\(\)]*(?<!\s)$/),
      'Mobile number contains digits and special characters only, and cannot start or end with a space',
    ),
})
const fullNameFormatValidation = (value: any) => {
  const fullNameRegex = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/;
  if (!fullNameRegex.test(value)) {
    return false;
  }
  return true;
};

export const profileValidationSchema = yup.object().shape({
  fullName: yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Full Name can only contain letters')
    .required('Full Name is required'),
  userName: yup
    .string()
    .required('User Name is required'),

  dob: yup
    .date()
    .max(new Date(), 'Date of Birth cannot be in the future')
    .required('Date of Birth is required'),
  license: yup.string()
    .matches(/^[A-Z]{2}[0-9]{2}\s?[0-9]{4}\s?[0-9]{7}$/, 'Please enter valid number')
  
});
export const ClubonboardingSchema = yup.object().shape({
  clubName: yup.string().required('Club Name is required'),
  description: yup.string().required('Description is required'),
  registrationNumber: yup.string().required('Registration Number is required'),
  headerquatername: yup.string().required('Headquarter Name is required'),
  startDate: yup.string().required('Start Date is required'),
  image: yup.string().required('Club logo is required'),
  email: yup
    .string()
    .email()
    .required('Email is required'),
  address: yup.string().required('Address is required'),
});


export const updateprofileValidationSchema = yup.object().shape({
  fullName: yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Full Name can only contain letters')
    .required('Full Name is required'),

  dob: yup
    .date()
    .max(new Date(), 'Date of Birth cannot be in the future')
    .required('Date of Birth is required'),
  gender: yup
    .string()
    .required('Gender is required'),
  license: yup.string()
    .matches(/^[A-Z]{2}[0-9]{2}\s?[0-9]{4}\s?[0-9]{7}$/, 'Please enter valid number')
});

export const validationSchema = yup.object().shape({
  description: yup.string().required('Description is required').trim(),
});

export const GroupNamevalidationSchema = yup.object().shape({
  name: yup.string().required('Group name is required'),
});


export const createRideValidation = yup.object().shape({
  rideTitle: yup.string().required('Ride title is required'),
  date: yup
    .date()
    .required('Start date is required'),
  endDate: yup
    .date()
    .required('End date is required'),
  km: yup.string().required('Kms is required'),
  meetingTime: yup.string().required('Meeting time is required'),
  ridingSkills: yup.string().required('Riding skill is required'),
  bikecc: yup.string().required('Bike CC is required'),
});

export const groupRideValidation = yup.object().shape({
  rideTitle: yup.string().required('Ride title is required'),
  date: yup
    .date()
    .required('Start date is required'),
  endDate: yup
    .date()
    .required('End date is required'),
  km: yup.string().required('Kms is required'),
  meetingTime: yup.string().required('Meeting time is required'),
});