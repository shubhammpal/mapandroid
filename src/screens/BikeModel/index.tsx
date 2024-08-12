import { View, Image, TouchableOpacity, Animated, FlatList, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppText from '../../component/AppText/AppText';
import { COLORS, ms } from '../../style';
import { strings } from '../../utils/strings';
import InputField from '../../component/CustomInput/InputField';
import { height, shadowStyle } from '../../style/typography';
import SubmitButton from '../../component/ButtonCotainer/SubmitButton';
import { styles } from './styles';
import {
  ArrowBAckIcon,
  ArrowDownIcon,
  BikeIcon,
} from '../../assets/svgImg/SvgImg';
import emitter from '../../component/Emitter/emitter';
import { requestBikeModal } from '../../services/api_Services';

type BikeModalScreenProps = {
  navigation: any;
  route: any;
};

const BikeModalScreen = ({ navigation, route }: BikeModalScreenProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<any>('');
  const [isImage, setIsimage] = useState<any>();
  const [bikeModal, setBikeModal] = useState<any>();
  useEffect(() => {
    getBikeModal();
  }, []);
  const getBikeModal = async () => {
    try {
      await requestBikeModal().then(async (res: any) => {
        if (res?.status == true) {
          setBikeModal(res?.payload);
        }
      });
    } catch (error) {
      console.log('PostList response: ', error);
    }
  };
  const [textInputHeight] = useState(new Animated.Value(40));
  const toggleDropdown = () => {
    Animated.timing(textInputHeight, {
      toValue: isDropdownOpen ? 50 : 120,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setIsDropdownOpen(!isDropdownOpen));
  };
  const handleItemPress = (item: any) => {
    setSelectedValue(item);
    setIsimage(item?.id);
  };
  return (
    <View style={[styles.container, shadowStyle]}>
      <View
        style={[
          styles.mainContainer,
          { marginTop: route?.params?.screen ? ms(4) : ms(10) },
        ]}>
        <SafeAreaView />
        {route?.params?.screen && (
          <View style={styles.arrow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowBAckIcon />
            </TouchableOpacity>
          </View>
        )}
        <View
          style={[
            styles.completeView,
            { marginTop: route?.params?.screen ? ms(8) : 0 },
          ]}>
          <AppText
            size={26}
            color={COLORS.white}
            family="PoppinsBold"
            align="center">
            {selectedValue?.brand_name ? 'My Rides' : strings.SELECT_COMPANY}
          </AppText>
        </View>
        <View style={styles.dummy}>
          <AppText
            size={15}
            color={COLORS.grey92}
            family="PoppinsLight"
            align="center">
            {/* Neque porro quisquam est qui dolorem ipsum quia dolor sit amet */}
          </AppText>
        </View>
        <View
          style={[
            isDropdownOpen && styles.isDropDown,
            { marginTop: isDropdownOpen ? 40 : 20 },
          ]}>
          <TouchableOpacity
            onPress={() => toggleDropdown()}
            style={{ marginTop: isDropdownOpen ? -18 : 0 }}>
            <InputField
              value={selectedValue?.brand_name}
              setValue={() => {}}
              secure={false}
              editable={false}
              iconLeft={
                isDropdownOpen ? (
                  <BikeIcon active={COLORS.green} />
                ) : (
                  <BikeIcon />
                )
              }
              icon={
                <TouchableOpacity onPress={() => toggleDropdown()}>
                  <ArrowDownIcon />
                </TouchableOpacity>
              }
              name={'Select model'}
            />
          </TouchableOpacity>
          {isDropdownOpen && (
            <FlatList
              key={isDropdownOpen ? 'open' : 'closed'}
              data={bikeModal}
              style={{ height: height / 2.55 }}
              numColumns={3}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.flatListContainer}
              columnWrapperStyle={styles.columnWrapper}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    handleItemPress(item);
                  }}
                  style={[
                    styles.bikeContainer,
                    {
                      backgroundColor:
                        isImage == item.id ? COLORS.red : COLORS.white2D,
                    },
                  ]}>
                  <Image
                    source={{ uri: item?.brand_logo }}
                    style={styles.bikeImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>
      <View style={{ marginHorizontal: ms(2), marginVertical: ms(5) }}>
        <SubmitButton
          title={'Continue'}
          pressing={() => {
            if (!isImage) {
              const data = {
                heading: 'failed',
                message: 'Please select at least one bike model',
              };
              emitter.emit('alert', data);
            } else {
              if (route?.params?.screen) {
                navigation.navigate('InnerBikeUpdate', {
                  modalData: selectedValue,
                  screen: 'mybike',
                });
              } else {
                navigation.navigate(strings.INNER_BIKE_MODAL, {
                  res: route?.params,
                  modalData: selectedValue,
                });
              }
            }
          }}
          widthOf={'98%'}
        />
      </View>
    </View>
  );
};

export default BikeModalScreen;
