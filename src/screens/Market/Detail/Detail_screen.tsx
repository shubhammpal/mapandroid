import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  FlatList,
  TouchableOpacity,
  Platform,
  Image,
  TextInput,
  Linking,
} from 'react-native';
import CustomHeader2 from '../../../component/header/Header2';
import AppText from '../../../component/AppText/AppText';
import SubmitButton from '../../../component/ButtonCotainer/SubmitButton';
import {COLORS} from '../../../style';
import {strings} from '../../../utils/strings';
import {
  FavouriteIcon,
  GoldStarIcon,
  LocationIconBlack,
  RedHeartIcon,
} from '../../../assets/svgImg/SvgImg';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {useRoute, RouteProp} from '@react-navigation/native';
import {getIdAsyncStorage} from '../../../services/auth_helper';
import SliderCorusel2 from '../../../component/SliderCorusel/SliderCoursel2';
import CustomInput from '../components/CustomInput';
import emitter from '../../../component/Emitter/emitter';
import {
  addToCartApi,
  CreateFavorite,
  getShippingCharges,
} from '../../../services/marketplace_Services';
import {styles} from './styles';
import {AuthContext} from '../../../component/auth/AuthContext';

interface Size {
  size_id: number;
  size_name: string;
}

interface Variant {
  cart_quantity: number;
  variant_id: number;
  color_id: number;
  color_name: string;
  quantity: number;
  images: string[];
  discount: string | number | undefined | any | bigint;
  price: number | undefined | any | bigint;
  upc: string;
  sku: string;
  sizes: Size[];
  privacy: any;
  is_fav: boolean;
  reviews: Review[];
}
interface Review {
  review_id: number;
  rating: number;
  review_text: string;
  user: {
    full_name: string;
    profile_picture: any;
  };
}

interface Product {
  product_id: number;
  zip_code: number;
  vendors_id: number;
  name: string;
  description: string;
  category_id: number;
  variants: Variant[];
}

interface Courier {
  etd: string; // Estimated Time of Delivery
  freight_charge: number; // Freight Charge
}

type DetailScreenRouteProp = RouteProp<{params: {data: Product}}, 'params'>;

const buttons = [
  {value: 'Description', label: 'Description'},
  {value: 'Reviews', label: 'Reviews'},
  {value: 'Shipping and Return Policy', label: 'Shipping and Return Policy'},
];

const DetailScreen = ({navigation}: any) => {
  const {userDetails}: any = useContext(AuthContext);
  const [value, setValue] = useState(1);
  const [cartvalue, setcartvalue] = useState<number | undefined | any>(
    undefined,
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState(buttons[0]?.value);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const route = useRoute<DetailScreenRouteProp>();
  const [pincode, setPincode] = useState();
  const {data} = route.params;
  const [productData, setProductData] = useState<Product | null>();
  const [shipcharge, setshipcharge] = useState<Courier | string | any>();
  const [fav, setfav] = useState<any>();
  const [selectedpoints, setselectedpoints] = useState(false);
  useEffect(() => {
    setProductData(data);
    setSelectedVariant(data.variants[0]);
  }, [data]);

  useEffect(() => {
    if (productData?.variants.length) {
      setSelectedVariant(productData.variants[0]);
    }
  }, [productData]);

  useEffect(() => {
    updateCartValue();
  }, [value, selectedVariant]);

  const updateCartValue = () => {
    setcartvalue(value + (selectedVariant?.cart_quantity ?? 0));
  };
  const handleIncreasePress = () => setValue(value + 1);
  const handleDecreasePress = () => value > 0 && setValue(value - 1);

  

  const renderTabContent = () => {
    const handleLinkPress = (url: any) => {
      Linking.openURL(url);
    };

    const getPolicyText = () => {
      switch (selectedVariant?.privacy) {
        case 1:
          return 'This product is non-returnable. For more details, see the policy.';
        case 2:
          return 'This product is eligible for a 7-day return. For more details, see the policy.';
        case 3:
          return 'This product is eligible for replacement. For more details, see the policy.';
        default:
          return 'Check the return policy for more details.';
      }
    };

    const getPolicyLink = () => {
      switch (selectedVariant?.privacy) {
        case 1:
          return 'https://mytra.club/returnpolicy-no-return';
        case 2:
          return 'https://mytra.club/returnpolicy-7-days';
        case 3:
          return 'https://mytra.club/returnpolicy-replacement';
        default:
          return 'https://mytra.club/returnpolicy';
      }
    };

    switch (selectedTab) {
      case 'Description':
        return (
          <View style={{paddingVertical: moderateVerticalScale(20)}}>
            <AppText family="PoppinsRegular">
              {productData?.description}
            </AppText>
          </View>
        );
      case 'Reviews':
        return (
          <View
            style={{
              marginVertical: moderateScale(30),
              width: '100%',
              justifyContent: 'center',
            }}>
            {selectedVariant?.reviews == null ? (
              <AppText size={18} family="PoppinsRegular" color="#646363">
                No reviews yet. Be the first to review this product!
              </AppText>
            ) : (
              selectedVariant.reviews.map((review, index) => (
                <View key={index} style={styles.ReviewContainer}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        borderWidth: 1,
                        borderRadius: moderateScale(50),
                        padding: moderateScale(10),
                        marginRight: moderateScale(10),
                      }}>
                      {review.user.profile_picture === null ? (
                        <Image
                          style={{height: 16, width: 16}}
                          source={require('../assets/person.png')}
                        />
                      ) : (
                        <Image
                          style={{
                            height: 16,
                            width: 16,
                            borderRadius: moderateScale(50),
                          }}
                          source={{
                            uri: review?.user?.profile_picture,
                          }}
                        />
                      )}
                    </View>
                    <View style={{flex: 1}}>
                      <AppText size={16} family='PoppinsSemiB'>
                        {review.user.full_name}
                      </AppText>
                      <AppText size={16}>{review.review_text}</AppText>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={require('../../../assets/img/star1.png')}
                        style={{
                          height: 14,
                          width: 14,
                          marginRight: moderateScale(5),
                        }}
                      />
                      <AppText size={16}>{review.rating}</AppText>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        );
      case 'Shipping and Return Policy':
        return (
          <View style={{marginVertical: moderateScale(30)}}>
            <AppText size={16} family="PoppinsRegular">
              {getPolicyText()}
            </AppText>
            <TouchableOpacity onPress={() => handleLinkPress(getPolicyLink())}>
              <AppText size={14} color={COLORS.blue} family="PoppinsRegular">
                See More
              </AppText>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (pincode) {
        handledeliverycode();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [pincode]);

  const handledeliverycode = async () => {
    try {
      const res = await getShippingCharges({
        delivery: pincode,
        pickup: productData?.zip_code,
      });
      
      if (res?.data) {
        setshipcharge(res?.data.available_courier_companies[0]);
      } else if (res?.status_code === 422) {
        const data = {
          heading: 'failed',
          message: 'Invalid Pincode',
        };
        emitter.emit('error', data);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleVariantChange = (variant: Variant) => {
    setSelectedVariant(variant);
    setSelectedColor(variant.color_name);
    setSelectedSize(null); // Reset size selection when changing variants
  };

  const renderItem = ({item}: {item: Size}) => {
    const isSelected = item.size_name === selectedSize;
    return (
      <TouchableOpacity
        style={[
          styles.sizeContainer,
          isSelected && styles.selectedSizeContainer,
        ]}
        onPress={() => setSelectedSize(item.size_name)}>
        <AppText
          size={14}
          family="PoppinsRegular"
          color={isSelected ? 'white' : COLORS.black}>
          {item.size_name}
        </AppText>
      </TouchableOpacity>
    );
  };

  const renderColorItem = ({item}: {item: Variant}) => {
    const imageUri =
      item?.images && item?.images?.length > 0
        ? item?.images[0]
        : 'https://st4.depositphotos.com/14953852/24787/v/1600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg';

    return (
      <TouchableOpacity
        onPress={() => handleVariantChange(item)}
        style={[
          styles.colorImageContainer,
          selectedVariant?.color_name === item.color_name &&
            styles.selectedColorContainer,
        ]}>
        <Image
          source={{uri: imageUri}}
          style={styles.colorImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  const ItemSeparator = () => <View style={{padding: 5}} />;
  const addtocart = async (productid: number) => {
    try {
      await addToCartApi({
        productid: productid,
        quantity: await cartvalue,
        buyerid: (await getIdAsyncStorage()) ?? '',
        variantid: selectedVariant?.variant_id,
      }).then(async (res: any) => {
        if (res?.status == true) {
          navigation.navigate(strings.CART_PAGE, {redeem: selectedpoints});
        }
      });
    } catch (error) {
      console.log('Places api response  response: ', error);
    }
  };
  const handleBuyNowPress = () => {
    if (selectedVariant) {
      navigation.navigate(strings.CHECKOUT_PAGE, {
        productData: data,
        selectedVariant: selectedVariant,
        quantity: value,
        selectedpoints: selectedpoints,
      });
    }
  };
  const handleFavorite = async (product_id: number, variant_id: number) => {
    const id = await getIdAsyncStorage();

    try {
      const res = await CreateFavorite({
        product_id: product_id,
        variant_id: variant_id,
        user_id: id,
      });

      if (res) {
        if (res?.status === true) {
          setfav(true);
        } else {
          setfav(false);
        }
      }
    } catch (error) {
      console.log('Error in handleFavorite:', error);
    }
  };
  const originalPrice: number = selectedVariant?.price ?? 0;
  const discount: number = selectedVariant?.discount ?? 0;
  const discountedPrice: number =
    originalPrice - (originalPrice * discount) / 100;

  const pointsRedemptionPercentage: number = 5;
  const pointsRedemptionValue: number =
    (discountedPrice * pointsRedemptionPercentage) / 100;
  const finalPrice: number = discountedPrice - pointsRedemptionValue;
  const discountedPriceString: string = finalPrice.toFixed();
  
  const points = pointsRedemptionValue * 4;
  const totalpoints = userDetails.total_earning_point;
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader2 back navigation={navigation} />
      {productData && (
        <Animated.ScrollView showsVerticalScrollIndicator={false}>
          <SliderCorusel2
            fav={
              <TouchableOpacity
                style={styles.icon}
                onPress={() =>
                  handleFavorite(
                    productData?.product_id,
                    selectedVariant?.variant_id ?? 0,
                  )
                }>
                {fav === true ? (
                  <RedHeartIcon width={20} height={20} />
                ) : (
                  <FavouriteIcon width={20} height={20} />
                )}
              </TouchableOpacity>
            }
            image={selectedVariant?.images}
          />
          <View
            style={[
              styles.paddingContainer,
              {marginTop: 10, marginBottom: Platform.OS === 'ios' ? 0 : 10},
            ]}>
            <View style={{width: '100%'}}>
              <AppText size={20} family="PoppinsSemiB">
                {productData.name}
              </AppText>
            </View>
            <View style={styles.pricecontainer}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 0,
                  alignItems: 'baseline',
                }}>
                <AppText size={20} family="PoppinsSemiB">
                  ₹{' '}
                  {selectedpoints
                    ? discountedPriceString
                    : discountedPrice.toFixed()}
                </AppText>
                <View style={{marginRight: 5}} />
                <AppText
                  size={20}
                  family="PoppinsMedium"
                  color="#8C8C8C"
                  underline="line-through">
                  ₹ {selectedVariant?.price?.toFixed()}
                </AppText>

                <View style={{marginRight: 5}} />
                <AppText size={14} family="PoppinsMedium" color="green">
                  {selectedVariant?.discount + '%'} OFF
                </AppText>
              </View>
              <View style={styles.ratingContainer}>
                <Image
                  source={require('../../../assets/img/star1.png')}
                  style={{height: 14, width: 14, marginRight: moderateScale(5)}}
                />
                <AppText>{selectedVariant?.reviews?.[0]?.rating ?? 0}</AppText>
              </View>
            </View>
            <View style={styles.creditcontainer}>
              <AppText family="PoppinsMedium" size={13}>
                By Using
              </AppText>

              <TouchableOpacity
                onPress={() => {
                  if (totalpoints < pointsRedemptionValue) {
                    setselectedpoints(!selectedpoints);
                  }
                }}
                style={[
                  styles.creditsubcontainer,
                  {
                    borderColor: selectedpoints ? 'black' : '#D9D9D9',
                    opacity: totalpoints <= pointsRedemptionValue ? 0.5 : 1, // Optional: visually indicate disabled state
                  },
                ]}
                disabled={totalpoints <= pointsRedemptionValue} // Disable interaction when points are insufficient
              >
                <View style={{marginRight: moderateScale(5)}}>
                  <GoldStarIcon />
                </View>
                <AppText family="PoppinsMedium" size={13}>
                  {points.toFixed()}
                </AppText>
              </TouchableOpacity>
            </View>
            <AppText size={14} family="PoppinsMedium" color={COLORS.redish}>
              {selectedVariant?.quantity === 0 ? 'Out of Stock' : null}
            </AppText>

            {selectedVariant?.sizes &&
            !selectedVariant.sizes.every(item => item === null) ? (
              <FlatList
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={ItemSeparator}
                horizontal
                data={selectedVariant.sizes}
                renderItem={renderItem}
                keyExtractor={item => item.size_name} // Use size_name as the key
              />
            ) : null}

            <View style={styles.addSub}>
              <TouchableOpacity onPress={handleDecreasePress}>
                <AppText size={20} color="#646363" family="PoppinsSemiB">
                  -
                </AppText>
              </TouchableOpacity>
              <AppText size={20} color="#646363" family="PoppinsSemiB">
                {value}
              </AppText>
              <TouchableOpacity onPress={handleIncreasePress}>
                <AppText size={20} color="#646363" family="PoppinsSemiB">
                  +
                </AppText>
              </TouchableOpacity>
            </View>
            {productData?.variants.length > 0 && (
              <View>
                <AppText size={16} family="PoppinsSemiB">
                  Colors
                </AppText>
                <FlatList
                  horizontal
                  data={productData.variants}
                  renderItem={renderColorItem}
                  keyExtractor={item => item.color_name}
                />
              </View>
            )}
            <AppText size={16} family="PoppinsSemiB">
              Address Pin code
            </AppText>
            <View style={styles.addressPinContainer}>
              <View style={styles.addressPin}>
                <CustomInput
                  height={40}
                  keyboard="numeric"
                  width={'100%'}
                  iconLeft={<LocationIconBlack />}
                  value={pincode}
                  setValue={setPincode}
                  secure={false}
                  placeholder={'Pincode'}
                />
              </View>
              {shipcharge && (
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: moderateScale(10),
                    alignItems: 'center',
                  }}>
                  <AppText
                    size={14}
                    color={COLORS.black}
                    family="PoppinsRegular">
                    {' '}
                    Delivery{' '}
                  </AppText>
                  <AppText size={14} family="PoppinsSemiB">
                    {shipcharge.etd}
                  </AppText>
                </View>
              )}
            </View>
            <View style={{marginVertical: 10}}>
              <FlatList
                initialScrollIndex={0}
                showsHorizontalScrollIndicator={false}
                data={buttons}
                horizontal
                keyExtractor={item => item.value}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => setSelectedTab(item.value)}>
                    <Text
                      style={{
                        padding: 10,
                        fontWeight:
                          selectedTab === item.value ? 'bold' : 'normal',
                        color: selectedTab === item.value ? 'black' : 'black',
                      }}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              {renderTabContent()}
            </View>

            {selectedVariant?.quantity === 0 ? (
              <SubmitButton
                title="Add to Cart"
                widthOf={'100%'}
                pressing={() => addtocart(productData?.product_id ?? 0)}
              />
            ) : (
              <View style={styles.submitButton}>
                <SubmitButton
                  title="Add to Cart"
                  widthOf={'48%'}
                  pressing={() => addtocart(productData?.product_id ?? 0)}
                />
                <SubmitButton
                  title="Buy Now"
                  colorChange="#49494D"
                  widthOf="48%"
                  pressing={handleBuyNowPress}
                />
              </View>
            )}
          </View>
        </Animated.ScrollView>
      )}
    </SafeAreaView>
  );
};

export default DetailScreen;
