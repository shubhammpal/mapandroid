// import libraries
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import SimpleHeader from '../../../component/header/Header';
import {moderateScale} from 'react-native-size-matters';
import FavouriteCard from './FavouritesCard';
import {getIdAsyncStorage} from '../../../services/auth_helper';
import {FavouriteIcon, RedHeartIcon} from '../../../assets/svgImg/SvgImg';
import AppText from '../../../component/AppText/AppText';
import {
  CreateFavorite,
  getFavorites,
} from '../../../services/marketplace_Services';
import {strings} from '../../../utils/strings';

interface Size {
  size_id: number;
  size_name: string;
}
export interface Variant {
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
  cart_quantity: number;
  is_fav: boolean;
  reviews: Review[];
}

export interface Review {
  review_id: number;
  rating: number;
  review_text: string;
}
interface FavouriteItem {
  wishlist_item_id: number;
  created_at: string;
  updated_at: string;
  product_id: number;
  product_name: string;
  product_description: string;
  product_price: number | null;
  variants: Variant[];
}

interface GetFavoritesResponse {
  status: boolean;
  message: string;
  data: FavouriteItem[];
}

const FavouritesScreen = ({navigation}: {navigation: any}) => {
  const [favourites, setFavourites] = useState<FavouriteItem[]>([]);

  useEffect(() => {
    getFavourites();
  }, []);

  const getFavourites = async () => {
    try {
      const res: GetFavoritesResponse = await getFavorites();
  
      if (res?.status === false) {
        setFavourites([]);
      }
      if (res?.data) {
        setFavourites(res.data);
      }
    } catch (error) {
      console.error('Failed to fetch favourites:', error);
    }
  };

  const handleFavorite = async (product_id: number, variant_id: number) => {
    const user_id = await getIdAsyncStorage();

    try {
      const res = await CreateFavorite({
        product_id: product_id,
        variant_id: variant_id,
        user_id: user_id,
      });

      if (res) {
        if (res.message.includes('added')) {
          getFavourites();
        } else if (res.message.includes('removed')) {
          getFavourites();
        }
      }
    } catch (error) {
      console.error('Error in handleFavorite:', error);
    }
  };
  const handlefavdetails = (item: any) => {
    navigation.navigate(strings.DETAIL_PAGE, {data: item});
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SimpleHeader label="Favorite" navigation={navigation} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.subcontainer}>
        {favourites.length > 0 ? (
          favourites.map(item => {
            const variant = item.variants[0];
            const image = variant.images[0];

            return (
              <TouchableOpacity onPress={() => handlefavdetails(item)}>
                <FavouriteCard
                  rating={
                    variant?.reviews && variant?.reviews?.length > 0
                      ? variant?.reviews[0]?.rating
                      : 0
                  }
                  icon={
                    <TouchableOpacity
                      onPress={() =>
                        handleFavorite(item.product_id, variant.variant_id)
                      }>
                      {favourites ? (
                        <RedHeartIcon width={14} height={14} />
                      ) : (
                        <FavouriteIcon width={14} height={14} />
                      )}
                    </TouchableOpacity>
                  }
                  key={item.wishlist_item_id} // Use the wishlist_item_id as the key
                  image={{uri: image}} // Use uri for remote images
                  text={item.product_name}
                  price={variant.price}
                />
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <AppText family="PoppinsMedium">
              You don't have any favorite item added in the list{' '}
            </AppText>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subcontainer: {
    paddingHorizontal: moderateScale(20),
    marginVertical: moderateScale(10),
  },
});

// make this component available to the app
export default FavouritesScreen;
