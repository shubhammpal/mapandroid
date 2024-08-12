import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {COLORS} from '../../../style';
import AppText from '../../../component/AppText/AppText';
import {moderateScale} from 'react-native-size-matters';

type CustomCardType = {
  lefticon?: any;
  righticon?: any;
  label?: string;
  discription?: string | number | any;
  editable?: boolean;
  style?: any;
  value?: string;
  setvalue?: (text: string) => void;
  inputref?: any;
  maxlength?: number;
  KeyboardType?: string | any;
};

const CustomCardCheck: React.FC<CustomCardType> = ({
  lefticon,
  righticon,
  label,
  discription,
  editable,
  style,
  value,
  setvalue,
  inputref,
  maxlength,
  KeyboardType,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {lefticon && (
          <View style={styles.row}>
            <View style={styles.iconContainer}>{lefticon}</View>
            {label && (
              <View style={styles.textContainer}>
                <AppText
                  size={16}
                  family="PoppinsMedium"
                  color="#646363"
                  children={label}
                />
              </View>
            )}
          </View>
        )}
        {righticon && righticon}
      </View>
      {discription ? (
        <View style={{marginLeft: moderateScale(50), width: '90%'}}>
          <AppText
            size={16}
            family="PoppinsRegular"
            width={'90%'}
            color="#646363">
            {discription}
          
          </AppText>
        </View>
      ) : (
        <View
          style={{
            marginLeft: moderateScale(50),
            width: '90%',
          }}>
          <TextInput
            maxLength={maxlength}
            placeholderTextColor={'#636364'}
            ref={inputref}
            value={value}
            onChangeText={setvalue}
            editable={editable}
            style={style}
            placeholder={label}
            keyboardType={KeyboardType}
          />
        </View>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(10),
    backgroundColor: COLORS.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: moderateScale(20),
  },
  textContainer: {
    flex: 1,
  },
});

export default CustomCardCheck;
