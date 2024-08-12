import {View, StyleSheet, Dimensions, TextInput, Text} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../style';
import {fonts} from '../../utils/misc';
import {moderateScale} from 'react-native-size-matters';
import {DefaultTheme} from 'react-native-paper';

const {height: screenHeight, width: screenWidth} = Dimensions.get('window');

type InputFieldProps = {
  value: any;
  maxLength?: number;
  placeholder: string;
  valid?: boolean;
  setValue: (value: any) => void;
  secure: boolean;
  editable?: boolean;
  border?: number;
  formikValue?: any;
  formikError?: any;
  keyboard?:
    | 'numeric'
    | 'email-address'
    | 'ascii-capable'
    | 'default'
    | 'visible-password';
  ref?: any;
  autoCapitalize?: 'none' | 'characters' | 'sentences' | 'words';
  onSubmit?: () => void;
  returnKeyType?: string;
  icon?: JSX.Element;
  width?: any;
  iconLeft?: JSX.Element;
  bgColor?: string;
  height?: number;
};

const CustomInput = ({
  value,
  setValue,
  placeholder,
  icon,
  iconLeft,
  editable = true,
  keyboard,
  formikValue,
  formikError,
  ref,
  width,
  autoCapitalize = 'none',
  valid,
  onSubmit,
  maxLength,
  returnKeyType,
  bgColor = 'white',
  height,
  secure,
}: InputFieldProps) => {
  const [focus, setFocus] = useState(false);

  const isBgColorWhite = bgColor === 'white';

  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary:
        formikValue && formikError
          ? COLORS.fadeRrrorRed
          : isBgColorWhite
          ? COLORS.black
          : COLORS.white,
      text: isBgColorWhite ? COLORS.black : COLORS.white,
      placeholder: isBgColorWhite ? COLORS.black : COLORS.white,
    },
  };

  const dynamicHeight = height || Dimensions.get('window').height * 0.07;
  const borderColor = formikError ? COLORS.fadeRrrorRed : '#D4D5D9';

  return (
    <View
      style={[
        styles.inputView,
        {
          width: width,
          height: dynamicHeight,
          backgroundColor: bgColor,
          borderColor,
        },
      ]}>
      {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>}
      <TextInput
        style={[
          styles.inputbox,
          { fontFamily:fonts.PoppinsRegular,
            color: isBgColorWhite ? COLORS.black : COLORS.white,
            height: '100%', // Ensures the TextInput fills the height of the parent View
            paddingVertical: moderateScale(0), // Adjust padding as needed
            fontSize: moderateScale(14), // Adjust font size to fit the height
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={'#767676'}
        value={value}
        onChangeText={setValue}
        secureTextEntry={secure}
        editable={editable}
        keyboardType={keyboard}
        ref={ref}
        autoCapitalize={autoCapitalize}
        onSubmitEditing={onSubmit}
        maxLength={maxLength}
        onBlur={() => setFocus(false)}
        textAlignVertical="center" // Center text vertically
        multiline={false} // Ensure multiline is false if you don't want multiple lines
      />
      {icon && <View style={styles.iconRight}>{icon}</View>}
      {formikError && <Text style={styles.errorText}>{formikError}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: moderateScale(40),
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
  },
  inputbox: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  iconLeft: {
    marginRight: moderateScale(2),
  },
  iconRight: {
    marginLeft: moderateScale(10),
  },
  errorText: {
    color: COLORS.fadeRrrorRed,
    fontSize: moderateScale(12),
    marginTop: 4,
    marginLeft: moderateScale(10),
  },
});

export default CustomInput;
