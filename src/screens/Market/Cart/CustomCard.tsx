import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Card} from 'react-native-paper';
import {COLORS} from '../../../style';
import AppText from '../../../component/AppText/AppText';
import {moderateScale} from 'react-native-size-matters';
import {DeleteIconRed} from '../../../assets/svgImg/SvgImg';

interface CustomCardProps {
  text: string;
  image: string;
  onpress: () => void;
  price?: number | string | any;
  count?: number;
  value?: number;
  decrease?: () => void;
  increase?: () => void;
  outofstock?: any;
}

const truncateText = (text: string, limit: number) => {
  const words = text.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }
  return text;
};

const CustomCard: React.FC<CustomCardProps> = ({
  text,
  image,
  onpress,
  price = 100,
  value = 0,
  decrease,
  increase,
  outofstock,
}) => {
  return (
    <Card style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.imageTextContainer}>
          <FastImage
            style={styles.images}
            source={{uri: image}}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <AppText size={14} family="PoppinsRegular">
              {truncateText(text, 2)}
            </AppText>
          </View>
        </View>
        <View style={styles.controlsContainer}>
          {outofstock  ? (
            <AppText color={COLORS.redish}>Out of Stock</AppText>
          ) : (
            <View style={styles.addSub}>
              <TouchableOpacity onPress={decrease}>
                <AppText size={20} color="#646363" family="PoppinsSemiB">
                  -
                </AppText>
              </TouchableOpacity>
              <AppText size={13} color="#646363" family="PoppinsSemiB">
                {value}
              </AppText>
              <TouchableOpacity onPress={increase}>
                <AppText size={20} color="#646363" family="PoppinsSemiB">
                  +
                </AppText>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.priceContainer}>
            <AppText size={16} color="#646363" family="PoppinsRegular">
              {`₹ ${value * price}`}
            </AppText>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={onpress} style={styles.deleteButton}>
        <DeleteIconRed />
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: moderateScale(15),
    marginBottom: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    position: 'relative',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  images: {
    height: moderateScale(60),
    width: moderateScale(60),
    borderRadius: moderateScale(5),
    marginRight: moderateScale(10),
  },
  textContainer: {
    flex: 1,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addSub: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    paddingHorizontal: moderateScale(5),
    borderRadius: moderateScale(50),
    height: moderateScale(30),
    width: moderateScale(70),
    justifyContent: 'space-between',
  },
  priceContainer: {
    marginLeft: moderateScale(10),
  },
  deleteButton: {
    position: 'absolute',
    top: moderateScale(-15),
    right: moderateScale(-10),
    zIndex: 1,
  },
});

export default CustomCard;
