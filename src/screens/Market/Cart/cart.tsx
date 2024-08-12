import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import CustomCard from './CustomCard';
import AppText from '../../../component/AppText/AppText';
import {strings} from '../../../utils/strings';
import SubmitButton from '../../../component/ButtonCotainer/SubmitButton';
import {COLORS} from '../../../style';
import SimpleHeader from '../../../component/header/Header';
import {moderateScale} from 'react-native-size-matters';
import {getIdAsyncStorage} from '../../../services/auth_helper';
import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';
import {
  addToCartApi,
  deleteCartApi,
  getCartItemApi,
} from '../../../services/marketplace_Services';
import {styles} from './CartStyle';

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
}

interface CartScreenProps {
  navigation: any;
  count: number;
  route: any;
}
interface Reedeem {
  redeem: boolean;
}
type CartScreenRouteProp = RouteProp<{params: {redeem: Reedeem}}, 'params'>;

const CartScreen = ({navigation}: CartScreenProps) => {
  const [cartList, setCartList] = useState<CartItem[]>([]);
  const [updatecart, setupdatecart] = useState<CartItem[]>([]);
  const route = useRoute<CartScreenRouteProp>();
  const selectedpoints = route?.params;

  const handleIncreasePress = async (cartItem: CartItem) => {
    try {
      const newQuantity = cartItem.quantity + 1;
      await addToCartApi({
        productid: cartItem.product_id,
        quantity: newQuantity,
        buyerid: (await getIdAsyncStorage()) ?? '',
        variantid: cartItem.variants[0].variant_id,
      });

      const updatedCart = cartList.map(item => {
        if (item.cart_item_id === cartItem.cart_item_id) {
          return {...item, quantity: newQuantity};
        }
        return item;
      });
      setCartList(updatedCart);
    } catch (error) {
      console.log('Error increasing cart quantity: ', error);
    }
  };

  const handleDecreasePress = async (cartItem: CartItem) => {
    if (cartItem.quantity > 1) {
      try {
        const newQuantity = cartItem.quantity - 1;
        await addToCartApi({
          productid: cartItem.product_id,
          quantity: newQuantity,
          buyerid: (await getIdAsyncStorage()) ?? '',
          variantid: cartItem.variants[0].variant_id,
          cart_id: cartItem.cart_item_id, // Pass the cart item id as cart_id
        });

        const updatedCart = cartList.map(item => {
          if (item.cart_item_id === cartItem.cart_item_id) {
            return {...item, quantity: newQuantity};
          }
          return item;
        });
        setCartList(updatedCart);
      } catch (error) {
        console.log('Error decreasing cart quantity: ', error);
      }
    } else {
      DeleteCart(cartItem.cart_item_id);
    }
  };

  useFocusEffect(
    useCallback(() => {
      GetCartList();
    }, [cartList]),
  );

  const DeleteCart = async (cart_item_id: number) => {
    try {
      const res = await deleteCartApi(cart_item_id);
      if (res?.status === true) {
        GetCartList();
      }
    } catch (error) {
      console.log('DeleteCart API response error: ', error);
    }
  };

  const GetCartList = async () => {
    try {
      const id = await getIdAsyncStorage();
      const res = await getCartItemApi({id: id as string});
      if (res?.data) {
        setCartList(res?.data);
      } else {
        setCartList([]);
      }
    } catch (error) {
      console.log('GetCartList API response error: ', error);
    }
  };
  const checkCartQuantities = (): boolean => {
    for (const item of cartList) {
      if (item.quantity > 5) {
        return false;
      }
    }
    return true;
  };

  const [navigateToCheckout, setNavigateToCheckout] = useState(false);

  useEffect(() => {
    if (navigateToCheckout) {
      if (updatecart && updatecart.length > 0) {
        
        navigation.navigate(strings.CHECKOUT_PAGE, {
          data: updatecart,
          redeem: selectedpoints,
        });
      } else {
        Alert.alert(
          'Out of Stock',
          'All items in your cart are out of stock. Please remove them before proceeding.',
        );
      }
      setNavigateToCheckout(false);
    }
  }, [updatecart, navigateToCheckout]);

  const filterOutOfStock = async (): Promise<void> => {
    const updatedCart = cartList.filter(item => item.variants[0].quantity != 0);
    console.log('Updated Cart: ', updatedCart);
    setupdatecart(updatedCart);
  };

  const handleCheckoutPress = async () => {
    if (checkCartQuantities()) {
      await filterOutOfStock();
      setNavigateToCheckout(true); // Set the flag to trigger navigation
    } else {
      Alert.alert(
        'Quantity Limit Exceeded',
        'You can only buy up to 5 units of each product. Please adjust the quantities in your cart.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader label="Cart" navigation={navigation} />
      <Animated.ScrollView>
        <View style={styles.paddingContainer}>
          <View style={{marginTop: moderateScale(10)}} />
          {cartList.length === 0 && (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <AppText
                children={'No items added to cart.'}
                size={16}
                family="PoppinsSemiB"
              />
            </View>
          )}
          {cartList.map(cartItem => {
            if (!cartItem || !cartItem.variants || !cartItem.variants[0]) {
              return null; // Skip if any required property is missing
            }
            const image = cartItem.variants[0]?.images[0] || null;
            const originalPrice: number = cartItem?.variants[0].price ?? 0;
            const discount: number | any = cartItem?.variants[0].discount ?? 0;
            const discountedPrice: number | any =
              originalPrice - (originalPrice * discount) / 100;

            return (
              <CustomCard
                outofstock={cartItem.variants[0].quantity === 0}
                value={cartItem.quantity}
                decrease={() => handleDecreasePress(cartItem)}
                increase={() => handleIncreasePress(cartItem)}
                key={cartItem.cart_item_id}
                onpress={() => DeleteCart(cartItem.cart_item_id)}
                image={
                  image ? image : require('../../../assets/img/helmet1.png')
                }
                text={cartItem.product_name}
                price={discountedPrice.toFixed()}
                count={cartItem.quantity}
              />
            );
          })}
        </View>
        {cartList.length > 0 && cartList ? (
          <View style={styles.submitbutton}>
            <SubmitButton
              title="Go to Checkout"
              widthOf={'100%'}
              pressing={handleCheckoutPress}
            />
          </View>
        ) : null}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;
