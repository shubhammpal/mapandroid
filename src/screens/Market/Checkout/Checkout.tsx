import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Animated,
  Image,
  FlatList,
  Platform,
  TouchableOpacity,
  Alert,
  TextInput,
  Text,
} from 'react-native';
import SubmitButton from '../../../component/ButtonCotainer/SubmitButton';
import {COLORS} from '../../../style';
import SimpleHeader from '../../../component/header/Header';
import CustomCardCheck from './CustomCardCheck';
import {
  DileveryIconBlue,
  EditIconBlue,
  EmailIconBlue,
  LocationBlue,
  PhoneIconBlue,
  ProductIconBlue,
} from '../../../assets/svgImg/SvgImg';
import AppText from '../../../component/AppText/AppText';
import {moderateScale, scale} from 'react-native-size-matters';
import CustomTotal from '../Common/CustomTotal';
import {
  GenerateShipOrder,
  GenerateShipToken,
  getAddress,
  getShippingCharges,
  ProductPurchaseService,
  Razorpayment,
} from '../../../services/marketplace_Services';
import {AuthContext} from '../../../component/auth/AuthContext';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import RazorpayCheckout from 'react-native-razorpay';
import {strings} from '../../../utils/strings';
import emitter from '../../../component/Emitter/emitter';
import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';
import AddressSheet from '../components/AddressSheet';
import SelectAddress from '../components/SelectAddress';
import {setShipTokenAsyncStorage} from '../../../services/auth_helper';
import FastImage from 'react-native-fast-image';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {styles} from './CheckoutStyle';
import CustomInput from '../components/CustomInput';

interface Size {
  size_id: number;
  size_name: string;
}

interface Variant {
  variant_id: number;
  color_id: number;
  color_name: string;
  quantity: number;
  images: string[];
  discount: string;
  price: number;
  upc: string;
  sku: string;
  weight: number;
  sizes: Size[];
}

interface CartItem {
  cart_item_id: number;
  quantity: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  product_id: number;
  product_name: string;
  product_description: string;
  product_price: string;
  variants: Variant[];
  zip_code: any;
}

interface CheckoutScreenProps {
  navigation: any;
  route: any;
}

interface AddressData {
  address: string;
  address1: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
}
interface Courier {
  etd: string;
  freight_charge: number;
}

const CheckoutScreen = ({navigation, route}: CheckoutScreenProps) => {
  const {userDetails} = useContext<any>(AuthContext);
  const [phone, setphone] = useState(userDetails?.phone);
  const [email, setemail] = useState(userDetails?.email);
  const [isPhoneEditable, setIsPhoneEditable] = useState(false);
  const [isEmailEditable, setIsEmailEditable] = useState(false);
  const [address, setAddress] = useState('');
  const [address1, setAddress1] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [shipping, setShipping] = useState<Courier | any>(0);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [total, setTotal] = useState<number | any>(0);
  const [redeem, setredeem] = useState<number>(0);
  const snapPoints = useMemo(() => ['75%'], []);
  const iossnapPoints = useMemo(() => ['70%'], []);
  const [showAddressSheet, setShowAddressSheet] = useState(false);
  const {productData, selectedVariant, quantity, data} = route?.params;
  const razorpayKey = 'rzp_test_OUpYVVcWHqlUdQ';
  const [order_id, setorder_id] = useState('');
  const [addressesData, setAddressesdata] = useState<any[]>([]);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [addpoints, setaddpoints] = useState<any>(0);
  const selectedpoints = route?.params;
  const [chargearray, setchargearray] = useState<any>([]);
  const cartList: CartItem[] = useMemo(() => {
    if (data) {
      return data?.map((item: CartItem) => ({
        ...item,
        product_price: item?.variants[0]?.price.toFixed(2),
      }));
    } else if (productData && selectedVariant) {
      return [
        {
          cart_item_id: selectedVariant?.variant_id,
          quantity: quantity ?? 1,
          is_active: true,
          created_at: '',
          updated_at: '',
          product_id: productData?.product_id,
          zip_code: productData?.zip_code,
          product_name: productData?.name,
          product_description: productData?.description,
          product_price: selectedVariant?.price,
          variants: [selectedVariant],
        },
      ];
    } else {
      return [];
    }
  }, [data, productData, selectedVariant, quantity]);
  const [promo, setpromo] = useState();
  useFocusEffect(
    useCallback(() => {
      fetchAddress();
    }, []),
  );
  const fetchAddress = async () => {
    try {
      const res = await getAddress();
      if (res?.payload) {
        setAddressesdata(res?.payload);
        if (res.payload) {
          const defaultAddress =
            res.payload.length > 0 ? res.payload.length - 1 : null;
          const lastObject =
            defaultAddress !== null ? res.payload[defaultAddress] : null;
          if (lastObject) {
            const {address, address1, city, postalCode, state, country} =
              lastObject;
            setAddress(address || '');
            setAddress1(address1 || '');
            setCity(city || '');
            setPincode(postalCode || '');
            setState(state || '');
            setCountry(country || '');
          }
        }
      }
    } catch (error) {
      console.log('Failed to fetch addresses: ', error);
    }
  };

  const mainaddress = `${address} ${address1} ${city} ${state} ${country} ${pincode}`;

  const formatAddress = (addressData: AddressData) => {
    return `${addressData.address} ${addressData.address1} ${addressData.city} ${addressData.state} ${addressData.country} ${addressData.postalCode}`;
  };
  const lastIndex =
    addressesData && addressesData.length > 0 ? addressesData.length - 1 : null;
  const lastAddress =
    lastIndex !== null ? formatAddress(addressesData[lastIndex]) : mainaddress;
  const sanitizeAddress = (address: string) => {
    if (!address) return;

    return address.replace(/ undefined /g, '').trim();
  };
  const sanitizedAddress = sanitizeAddress(lastAddress);

  const shippingAddress = async (
    pickup: any,
    delivery: any,
    productId: number,
    variantId: number,
  ) => {
    try {
      const res = await getShippingCharges({pickup, delivery});

      let freightCharge = 0;
      if (res?.data) {
        freightCharge = res.data.available_courier_companies[0].freight_charge;
      } else {
        handleShippingError(res);
      }

      const chargeObject = {
        productId,
        variantId,
        freightCharge,
      };
      setchargearray((prevArray: any) => [...prevArray, chargeObject]);
    } catch (error) {
      const chargeObject = {
        productId,
        variantId,
        freightCharge: 0,
      };
      setchargearray((prevArray: any) => [...prevArray, chargeObject]);
      setShipping((prevCharge: any) => prevCharge); // Add 0, no change in freight charge
    }
  };

  

  const handleShippingError = async (res: any) => {
    if (res?.status_code === 422) {
      const data = {
        heading: 'Failed',
        message: 'Invalid Pincode',
      };
      emitter.emit('error', data);
    } else if (res?.status_code === 401) {
      const tokenRes = await GenerateShipToken();
      if (tokenRes) {
        setShipTokenAsyncStorage(tokenRes?.token);
      } else {
        console.log('Error generating ship token');
      }
    } else {
      console.log('Unexpected response:', res);
    }
  };

  const calculateSubtotal = useCallback(async () => {
    let total = 0;
    let redeemtotal = 0;
    let totalpoints = 0;
    let minuspoint = 0;

    for (const item of cartList) {
      
      if (item.zip_code && pincode) {
        await shippingAddress(
          item.zip_code,
          pincode,
          item.product_id,
          item.variants[0].variant_id,
        );
      }
    }

    // Calculate subtotal and points
    for (const item of cartList) {
      const price = item?.variants[0]?.price || 0;
      const discount: any = item?.variants[0]?.discount || 0;
      const quantity = item?.quantity || 0;

      const discountedPrice = price - (price * discount) / 100;
      const pointsRedemptionValue = (discountedPrice * 5) / 100;
      const finalPrice = discountedPrice - pointsRedemptionValue;
      const points = pointsRedemptionValue * 4;

      minuspoint += pointsRedemptionValue;
      totalpoints += points;
      total += discountedPrice * quantity;
      redeemtotal += finalPrice * quantity;
    }

    setaddpoints(minuspoint);

    if (selectedpoints?.redeem === true) {
      setSubTotal(total);
      setredeem(0);
    } else {
      setSubTotal(redeemtotal);
      setredeem(totalpoints);
    }
  }, [cartList, selectedpoints, pincode]);

  const calculateTotalFreightCharge = useCallback(() => {
    let totalCharge = 0;

    for (const item of cartList) {
      const chargeObject = chargearray.find(
        (charge: any) =>
          charge.productId === item.product_id &&
          charge.variantId === item.variants[0].variant_id,
      );

      if (chargeObject) {
        totalCharge += chargeObject.freightCharge;
      }
    }
    setShipping(totalCharge);
  }, [cartList, chargearray]);

  useEffect(() => {
    calculateSubtotal();
  }, [cartList, calculateSubtotal]);

  useEffect(() => {
    setTotal(subTotal + shipping - addpoints);
    calculateTotalFreightCharge();
  });
  const handlePresentModalPress = useCallback((isEditIcon: boolean) => {
    setShowAddressSheet(isEditIcon);
    bottomSheetModalRef?.current?.present();
  }, []);

  const handleAddressSubmit = (addressData: AddressData) => {
    setAddressesdata(prevAddresses => {
      const validAddresses = Array.isArray(prevAddresses) ? prevAddresses : [];
      if (addressData) {
        return [...validAddresses, addressData];
      } else {
        return validAddresses;
      }
    });

    setAddress(addressData?.address);
    setAddress1(addressData?.address1);
    setCity(addressData?.city);
    setPincode(addressData?.postalCode);
    setState(addressData?.state);
    setCountry(addressData?.country);

    bottomSheetModalRef.current?.dismiss();
  };

  const renderItem = ({item}: {item: CartItem}) => {
    const firstImage = item?.variants[0]?.images[0];
    return (
      <View style={styles.imageContainer}>
        {firstImage ? (
          <Image
            resizeMode="contain"
            style={styles.productImage}
            source={{uri: firstImage}}
          />
        ) : (
          <View style={styles.noImage}>
            <AppText>No Image</AppText>
          </View>
        )}
      </View>
    );
  };

  const Orders = async () => {
    try {
      const res = await GenerateShipOrder({
        orderitem: cartList,
        order_id: productData?.product_id ?? 0,
        firstname: userDetails?.full_name,
        lastname: '',
        address,
        address1,
        city,
        pincode,
        state,
        country,
        email: userDetails?.email ?? email,
        phone: userDetails?.mobile ?? phone,
        shippingcharge: shipping,
        sub_total: subTotal,
        weight: 1,
      });

      if (res) {
        setorder_id(res?.order_id);
      }
    } catch (error) {
      const data = {
        heading: 'Error',
        messege: `${error}`,
      };
      emitter.emmit('error', data);
    }
  };

  const PurchaseApi = async ({status, transactionid}: any) => {
    try {
      const res = await ProductPurchaseService({
        address: `${address} ${address1}`,
        city,
        state,
        postalCode: pincode,
        country,
        countryCode: '+91',
        phone: userDetails?.mobile ?? phone,
        total_price: total,
        products: cartList,
        transactionId: transactionid,
        status: status,
      });
      if (res) {
        console.log('Purchase Response:', res);
      }
    } catch (error) {
      console.log('Purchase API response error: ', error);
    }
  };

  const handlePayment = async () => {
    if (address || address1 || city || pincode || state || country) {
      try {
        const amountInPaise = Math.round(total * 100);

        const res = await Razorpayment({
          amount: amountInPaise,
        });
        
        if (res && res?.status === 'created' && res?.id) {
          const options: any = {
            description: 'Purchase Description',
            image:
              'https://t4.ftcdn.net/jpg/08/43/35/17/240_F_843351716_263syvTWa5MQdvkAdCqiPSefsZPPHBTb.jpg',
            currency: 'INR',
            key: razorpayKey,
            amount: total.toFixed(2),
            name: 'Mytra',
            order_id: res?.id,
            prefill: {
              email: userDetails?.email,
              contact: userDetails?.mobile,
              name: userDetails?.full_name,
            },
          };

          if (RazorpayCheckout) {
            RazorpayCheckout?.open(options)
              .then(async (data: any) => {
                if (data?.razorpay_payment_id) {
                  Orders();
                  await PurchaseApi({
                    transactionid: data?.razorpay_payment_id,
                    status: 'Completed',
                  });
                  navigation.navigate(strings.TRACK_ORDER_SCREEN, {
                    order_id: order_id,
                    fromCheckout: true,
                  });
                } else {
                  Alert.alert('Something went wrong', 'We are Fixing it .');
                  PurchaseApi({status: 'Failed'});
                }
              })
              .catch((error: any) => {
                console.error('Payment Failed:', error.statuscode);
              });
          }
        } else {
          console.error('Failed to create order with Razorpay');
        }
      } catch (error) {
        console.error('Razorpay Payment Error:', error);
      }
    } else {
      Alert.alert('Address Required', 'Please select or enter your address.');
    }
  };

  const phoneInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);

  const handlePhoneEdit = () => {
    setIsPhoneEditable(true);
    setTimeout(() => phoneInputRef?.current?.focus(), 100);
  };

  const handleEmailEdit = () => {
    setIsEmailEditable(true);
    setTimeout(() => emailInputRef?.current?.focus(), 100);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (text: string) => {
    if (validateEmail(text) || text === '') {
      setemail(text);
    }
  };

  const renderBottomSheetContent = () => {
    if (showAddressSheet) {
      return (
        <AddressSheet
          onSubmit={handleAddressSubmit}
          newaddress={{
            address,
            address1,
            city,
            postalCode: pincode,
            state,
            country,
          }}
        />
      );
    } else {
      if (addressesData && addressesData.length > 0) {
        return (
          <SelectAddress
            onSelectAddress={handleAddressSubmit}
            addressData={addressesData}
          />
        );
      } else {
        return (
          <AddressSheet
            onSubmit={handleAddressSubmit}
            newaddress={{
              address,
              address1,
              city,
              postalCode: pincode,
              state,
              country,
            }}
          />
        );
      }
    }
  };

  const renderActionSheetContent = () => (
    <View style={{paddingHorizontal: moderateScale(16)}}>
      <FlatList
        ListHeaderComponent={
          <View
            style={{
              marginBottom: moderateScale(16),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AppText size={16} family="PoppinsSemiB">
              Delivery Fee
            </AppText>
          </View>
        }
        data={cartList}
        renderItem={renderItemAction}
        keyExtractor={item => item.cart_item_id.toString()}
        showsHorizontalScrollIndicator={false}
        style={styles.imagesList}
      />
    </View>
  );

  const renderItemAction = ({item}: {item: CartItem}) => {
    const firstImage = item?.variants[0]?.images[0];
    const chargeObject = chargearray.find(
      (charge: any) =>
        charge.productId === item.product_id &&
        charge.variantId === item.variants[0].variant_id,
    );
    const freightCharge = chargeObject ? chargeObject.freightCharge : 0;
    return (
      <View style={{flexDirection: 'column', marginBottom: moderateScale(30)}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}></View>
        <View
          style={{
            marginVertical: moderateScale(8),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {firstImage ? (
              <View style={styles.imageContainer}>
                <Image
                  resizeMode="contain"
                  style={styles.productImage}
                  source={{uri: firstImage}}
                />
              </View>
            ) : (
              <View style={styles.noImage}>
                <AppText>No Image</AppText>
              </View>
            )}
            <View style={{width: '67%'}}>
              <AppText size={16} family="PoppinsMedium">
                {item.product_name}
              </AppText>
            </View>
          </View>
          <View>
            <AppText size={16} family="PoppinsMedium">
              {freightCharge.toFixed(2)}
            </AppText>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader navigation={navigation} label="Checkout" />

      <Animated.ScrollView style={styles.scrollView}>
        <View style={styles.paddingContainer}>
          <TouchableOpacity onPress={() => handlePresentModalPress(false)}>
            <CustomCardCheck
              lefticon={<LocationBlue />}
              righticon={
                <TouchableOpacity onPress={() => handlePresentModalPress(true)}>
                  <EditIconBlue />
                </TouchableOpacity>
              }
              label="Enter Your Addreess"
              discription={sanitizedAddress}
              editable={false}
            />
          </TouchableOpacity>
          <CustomCardCheck
            lefticon={<DileveryIconBlue />}
            label="Delivery Instruction"
            style={{color: 'black'}}
          />
          <CustomCardCheck
            style={{color: COLORS.black}}
            lefticon={<PhoneIconBlue />}
            label="Phone"
            inputref={phoneInputRef}
            value={phone ? phone : userDetails.mobile}
            setvalue={setphone}
            righticon={
              <TouchableOpacity onPress={handlePhoneEdit}>
                <EditIconBlue />
              </TouchableOpacity>
            }
            maxlength={10}
            editable={isPhoneEditable}
            KeyboardType={'numeric'}
          />

          <CustomCardCheck
            style={{color: COLORS.black}}
            lefticon={<EmailIconBlue />}
            label="Email"
            value={email ? email : userDetails.email}
            setvalue={handleEmailChange}
            righticon={
              <TouchableOpacity onPress={handleEmailEdit}>
                <EditIconBlue />
              </TouchableOpacity>
            }
            editable={isEmailEditable}
            inputref={emailInputRef} // Pass the ref to the CustomCardCheck component
          />
          <CustomInput
            value={promo}
            setValue={setpromo}
            secure={false}
            placeholder="PromoCode"
            iconLeft={
              <Image
                style={{
                  height: 20,
                  width: 20,
                  marginRight: moderateScale(10),
                  tintColor: COLORS.blue,
                }}
                source={require('../assets/badge.png')}
              />
            }
          />
          <CustomCardCheck
            lefticon={<ProductIconBlue />}
            label="Products"
            discription={
              cartList.length === 1
                ? cartList.length.toString() + ' ' + 'Product'
                : cartList.length.toString() + ' ' + 'Products'
            }
          />
          <FlatList
            data={cartList}
            renderItem={renderItem}
            keyExtractor={item => item.cart_item_id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.imagesList}
          />
          <CustomTotal text="Subtotal:" price={`₹` + subTotal.toFixed(2)} />
          <CustomTotal
            icon={
              <TouchableOpacity
                onPress={() => {
                  actionSheetRef.current?.show();
                }}>
                <FastImage
                  source={require('../assets/info.png')}
                  style={{
                    marginLeft: moderateScale(5),
                    height: 14,
                    width: 14,
                    backgroundColor: COLORS.white,
                  }}
                />
              </TouchableOpacity>
            }
            text="Delivery Fee"
            price={shipping.toFixed(2)}
          />
          {selectedpoints === true ? (
            <CustomTotal text="Redeem Points:" price={redeem.toFixed()} />
          ) : null}

          <View style={styles.total}>
            <AppText size={scale(20)} family="PoppinsBold" children="Total" />
            {selectedpoints === true ? (
              <AppText
                size={scale(20)}
                family="PoppinsBold"
                children={`₹${(subTotal + shipping - redeem).toFixed(2)}`}
              />
            ) : (
              <AppText
                size={scale(20)}
                family="PoppinsBold"
                children={`₹${(subTotal + shipping).toFixed(2)}`}
              />
            )}
          </View>
          <View style={styles.submitbutton}>
            <SubmitButton
              title="Pay"
              widthOf="100%"
              pressing={handlePayment} // Call handlePayment on button press
            />
          </View>
        </View>
      </Animated.ScrollView>

      <BottomSheetModal
        backgroundStyle={{zIndex: 0}}
        ref={bottomSheetModalRef}
        index={0}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        )}
        snapPoints={Platform.OS === 'android' ? snapPoints : iossnapPoints}>
        {renderBottomSheetContent}
      </BottomSheetModal>
      <ActionSheet ref={actionSheetRef}>
        {renderActionSheetContent()}
      </ActionSheet>
    </SafeAreaView>
  );
};

// Define styles

export default CheckoutScreen;
