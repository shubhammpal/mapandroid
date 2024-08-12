

import {View, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import {TextInput, DefaultTheme} from 'react-native-paper';
import {COLORS, ms} from '../../style';
import {fonts} from '../../utils/misc';
import {MobileIcon} from '../../assets/svgImg/SvgImg';

type InputFieldProps = {
  value: any;
  maxLength?: any;
  name: any;
  valid?: any;
  setValue: any;
  secure: boolean;
  editable?: boolean;
  border?: number;
  formikValue?: any;
  formikError?: any;
  numberOfLines?: any;
  keyboard?:
    | 'numeric'
    | 'email-address'
    | 'ascii-capable'
    | 'default'
    | 'visible-password';
  ref?: any;
  autoCapitalize?: 'none' | 'characters' | 'sentences' | 'words';
  onKeyPress?: any;
  onSubmit?: any;
  returnKeyType?: any;
  icon?: any;
  width?: any;
  iconLeft?: any;
  cutomHeight?: any;
  themeMode?: 'light' | 'dark'; // Add theme mode prop
};

const InputField = ({
  value,
  setValue,
  name,
  icon,
  iconLeft,
  editable,
  keyboard,
  formikValue,
  formikError,
  ref,
  width,
  autoCapitalize,
  valid,
  onSubmit,
  maxLength,
  returnKeyType,
  cutomHeight,
  themeMode = 'dark', // Default to dark mode
}: InputFieldProps) => {
  const [focus, setFocus] = useState(false);

  // Define light and dark themes
  const lightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: formikValue && formikError ? COLORS.fadeRrrorRed : COLORS.black,
      text: COLORS.black,
      placeholder: COLORS.black,
    },
  };

  const darkTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: formikValue && formikError ? COLORS.fadeRrrorRed : COLORS.white,
      text: COLORS.white,
      placeholder: COLORS.white,
    },
  };

  // Select theme based on themeMode prop
  const customTheme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <View style={[styles.inputView, {width: width,}]}>
      <TextInput
        style={[
          styles.innerBox,
          themeMode === 'light' ? [styles.lightInnerBox,{height : cutomHeight ? cutomHeight : 55}] : styles.darkInnerBox,
        ]}
        ref={ref}
        label={
          <Text
            style={[
              styles.customLabel,
              themeMode === 'light'
                ? styles.lightCustomLabel
                : styles.darkCustomLabel,
            ]}>
            {name}
            <Text style={styles.customError}>{valid}</Text>
          </Text>
        }
        value={value}
        mode="outlined"
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
        editable={editable}
        contentStyle={[
          styles.content,
          {color: themeMode === 'light' ? COLORS.black : COLORS.white},
        ]}
        outlineStyle={[
          styles.outline,
          {
            borderColor:
              formikValue && formikError
                ? COLORS.orangelight
                : themeMode === 'light'
                ? COLORS.grey54
                : COLORS.offblack43,
          },
        ]}
        keyboardType={keyboard ? keyboard : ('Default' as 'default')}
        onChangeText={text => setValue(text)}
        placeholderTextColor={themeMode === 'light' ? COLORS.greyAD : 'white'}
        onSubmitEditing={onSubmit}
        returnKeyType={returnKeyType}
        onBlur={() => setFocus(false)}
        theme={customTheme}
        left={
          iconLeft && (
            <TextInput.Icon style={styles.iconLeft} icon={() => iconLeft} />
          )
        }
        right={icon && <TextInput.Icon style={styles.icon} icon={() => icon} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    marginVertical: 10,
  },
  content: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: 16,
    
  },
  innerBox: {
    paddingHorizontal: 15,
  },
  darkInnerBox: {
    backgroundColor: COLORS.black21,
  },
  lightInnerBox: {
    backgroundColor: COLORS.white,
    height: 55
  },
  outline: {
    borderRadius: 50,
  },
  customLabel: {
    fontWeight: '500',
    fontSize: 16,
  },
  darkCustomLabel: {
    color: COLORS.semiAAA,
  },
  lightCustomLabel: {
    color: COLORS.greyAD,
  },
  customError: {
    color: '#D66957',
    fontFamily: fonts.PoppinsMedium,
  },
  icon: {
    top: 2,
    right: 5,
  },
  iconLeft: {
    top: 2,
    left: 5,
  },
});

export default InputField;
