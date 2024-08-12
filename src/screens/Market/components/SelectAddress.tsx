import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import AppText from '../../../component/AppText/AppText';

interface AddressData {
  postalCode: string;
  _id: any;
  address: string;
  address1: string; // Adjust this as needed
  city: string;
  pincode: string;
  state: string;
  country: string;
  shipping: number;
}

interface SelectAddressProps {
  onSelectAddress: (address: AddressData) => void;
  addressData: AddressData | any;
}

const SelectAddress: React.FC<SelectAddressProps> = ({
  onSelectAddress,
  addressData,
}) => {
  const handleSelectAddress = (address: AddressData) => {
    const addressData: AddressData = {
      address: address.address,
      address1: '',
      city: address.city,
      pincode: address.postalCode,
      state: address.state,
      country: address.country,
      shipping: 45.38,
      postalCode: address.postalCode,
      _id: address._id,
    };
    onSelectAddress(addressData);
  };

  const renderItem = ({item}: {item: AddressData}) => (
    <TouchableOpacity
      onPress={() => handleSelectAddress(item)}
      style={styles.itemContainer}>
      <AppText color="#626263" size={16} family="PoppinsMedium">
        {item.address}, {item.city}, {item.state} {item.postalCode},
        {item.country}
      </AppText>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <AppText size={scale(18)} family="PoppinsSemiB">
        Address
      </AppText>
      <FlatList
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        data={addressData.slice().reverse()}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        ListFooterComponent={<View style={{height: 10}} />}
        contentContainerStyle={{flexGrow: 1}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: scale(10),
    borderWidth: 1,
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    borderColor: '#626263',
  },
});

export default SelectAddress;
