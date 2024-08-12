import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {TextInput, DefaultTheme} from 'react-native-paper';
import {ArrowDownIcon} from '../../assets/svgImg/SvgImg';
import AppText from '../AppText/AppText';
import {COLORS} from '../../style';
import {fonts} from '../../utils/misc';

type DropDownInputFieldProps = {
  value: string;
  setValue?: (value: string) => void;
  name: any;
  valid?: string;
  secure: boolean;
  editable?: boolean;
  keyboard?:
    | 'numeric'
    | 'email-address'
    | 'ascii-capable'
    | 'default'
    | 'visible-password';
  ref?: any;
  autoCapitalize?: 'none' | 'characters' | 'sentences' | 'words';
  onSubmit?: () => void;
  returnKeyType?: any;
  right?: boolean;
  width?: any;
  width2?: any;
  iconLeft?: any;
  isDropdownOpen?: boolean;
  data?: {title: string}[];
  setSelectedValue?: (value: string) => void;
  setIsDropdownOpen?: (isOpen: boolean) => void;
  lightTheme?: boolean;
};

const DropDownInputField = ({
  value,
  setValue,
  name,
  right,
  iconLeft,
  editable,
  keyboard,
  ref,
  width,
  autoCapitalize,
  valid,
  onSubmit,
  returnKeyType,
  isDropdownOpen,
  data,
  setSelectedValue,
  setIsDropdownOpen,
  lightTheme = false,
}: DropDownInputFieldProps) => {
  const [focus, setFocus] = useState(false);

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: valid ? COLORS.fadeRrrorRed : COLORS.white,
      text: lightTheme ? COLORS.black : COLORS.white,
      placeholder: lightTheme ? COLORS.grey54 : COLORS.white,
    },
  };

  const inputStyle = lightTheme ? styles.inputLight : styles.inputDark;
  const outlineStyle = [
    styles.outline,
    {
      borderColor: valid ? COLORS.orangelight : COLORS.offblack43,
    },
  ];

  return (
    <View
      style={[
        isDropdownOpen
          ? [
              styles.isDropDown,
              {backgroundColor: lightTheme ? COLORS.white : '#212121'},
            ]
          : {marginTop: 8},
        {width: width},
      ]}>
      <TouchableOpacity
        onPress={() => {
          setIsDropdownOpen && setIsDropdownOpen(!isDropdownOpen);
        }}
        style={[
          styles.inputView,
          {width: '100%', marginTop: isDropdownOpen ? -18 : 0},
        ]}>
        <TextInput
          style={[styles.innerBox, inputStyle]}
          ref={ref}
          label={
            <Text style={styles.customLabel}>
              {name}
              <Text style={styles.customError}>{valid}</Text>
            </Text>
          }
          value={value}
          mode="outlined"
          autoCapitalize={autoCapitalize}
          editable={editable}
          contentStyle={[styles.content,{ color:lightTheme ? COLORS.black: COLORS.white,}]}
          outlineStyle={outlineStyle}
          keyboardType={keyboard || 'default'}
          onChangeText={setValue}
          placeholderTextColor={lightTheme ? COLORS.grey54 : 'white'}
          onSubmitEditing={onSubmit}
          returnKeyType={returnKeyType}
          onBlur={() => setFocus(false)}
          theme={theme}
          left={
            iconLeft && (
              <TextInput.Icon
                style={styles.iconLeft}
                icon={() => (
                  <TouchableOpacity
                    onPress={() =>
                      setIsDropdownOpen && setIsDropdownOpen(!isDropdownOpen)
                    }>
                    <ArrowDownIcon />
                  </TouchableOpacity>
                )}
              />
            )
          }
          right={
            right && (
              <TextInput.Icon
                style={styles.icon}
                icon={() => (
                  <TouchableOpacity
                    onPress={() =>
                      setIsDropdownOpen && setIsDropdownOpen(!isDropdownOpen)
                    }>
                    <ArrowDownIcon />
                  </TouchableOpacity>
                )}
              />
            )
          }
        />
      </TouchableOpacity>
      {isDropdownOpen && (
        <View
          style={[
            styles.dropDown,
            {backgroundColor: lightTheme ? COLORS.white : COLORS.black21},
          ]}>
          {data?.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedValue && setSelectedValue(item.title);
                setIsDropdownOpen && setIsDropdownOpen(!isDropdownOpen);
              }}
              style={{marginBottom: 10}}>
              <AppText size={14} color={COLORS.semiAAA} family="PoppinsMedium">
                {item.title}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>
      )}
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
    height: 55,
  },
  innerBox: {
    paddingHorizontal: 15,
  },
  outline: {
    borderRadius: 50,
  },
  customLabel: {
    color: COLORS.semiAAA,
    fontWeight: '500',
    fontSize: 16,
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
  isDropDown: {
    borderWidth: 1,
    borderRadius: 28,
    borderColor: COLORS.offblack43,
    marginTop: 35,
  },
  dropDown: {
    borderRadius: 28,
    paddingLeft: 30,
    paddingVertical: 12,
    paddingBottom: 20,
  },
  inputDark: {
    backgroundColor: COLORS.black21,
  },
  inputLight: {
    backgroundColor: 'white', // Example light theme background color
  },
});

export default DropDownInputField;
