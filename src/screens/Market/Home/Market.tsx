import React, { useState, useRef, useCallback, useMemo, useEffect, useContext } from 'react';
import {
  View,
  Animated,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  Platform,
  RefreshControl,
} from 'react-native';
import CustomHeader2 from '../../../component/header/Header2';
import CustomInput from '../components/CustomInput';
import {
  FavouriteIcon,
  FilterIconBlack,
  RedHeartIcon,
  SearchIconBlack,
} from '../../../assets/svgImg/SvgImg';
import MarketTabbar from '../Tabbarscreens/Tabbar';
import { strings } from '../../../utils/strings';
import FastImage from 'react-native-fast-image';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../../style';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import ProdutFilter from '../Common/ProductFilter';
import AppText from '../../../component/AppText/AppText';
import SliderCorusel from '../../../component/SliderCorusel/SliderCorusel';
import Skeleton from '../../../component/Skeleton/Skeleton';
import { getIdAsyncStorage } from '../../../services/auth_helper';
import useDebounce from '../hook/debounce';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from './style';
import {
  CreateFavorite,
  getCatagorylist,
  getProductlist,
} from '../../../services/marketplace_Services';
import { Category, MarketProps, Product } from '../types/MarketTypes';
import { AuthContext } from '../../../component/auth/AuthContext';

const Market = ({ navigation }: MarketProps) => {
  const { setDrawerPage }: any = useContext(AuthContext);
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 100);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [productData, setProductData] = useState<Product[]>([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['80%'], []);
  const iossnapPoints = useMemo(() => ['70%'], []);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);
  // ----------FOR DRAWER----------
  useEffect(() => {
    setDrawerPage(true)
  }, []);
  useEffect(() => {
    GetCategoryList();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (categoriesData.length > 0 && selectedTab < categoriesData.length) {
        GetProductList();
      }
    }, [selectedTab, filters, search, categoriesData]),
  );

  const GetCategoryList = async () => {
    try {
      const res = await getCatagorylist();
      if (res?.data) {
        setCategoriesData(res.data);
      }
    } catch (error) {
      console.log('GetCategoryList response: ', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const GetProductList = async () => {
    const id = await getIdAsyncStorage();
    console.log('id', id);
    try {
      const selectedCategory = categoriesData[selectedTab]?.id;
      const res = await getProductlist({
        filter: filters,
        name: debouncedSearch,
        catagory_id: selectedCategory,
      });
      if (res?.payload) {
        setProductData(res.payload);
      }
    } catch (error) {
      console.log('GetProductList response: ', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleCategoryChange = (index: number) => {
    setSelectedTab(index);
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
        if (res.status) {

        } else {

        }
        GetProductList();
      }
    } catch (error) {
      console.log('Error in handleFavorite:', error);
    }
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    
  }, []);

  const applyFilters = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
    bottomSheetModalRef.current?.close();
  };

  const handleResetFilters = () => {
    setFilters({});
    bottomSheetModalRef.current?.close();
  };

  const renderItem = ({ item }: { item: Product }) => {
    const variant = item.variants[0];
    const isFavorite: any = variant.is_fav;
    const originalPrice: number = variant?.price ?? 0;
    const discount: number = parseFloat(variant?.discount ?? '0');

    const discountedPrice: number =
      originalPrice - (originalPrice * discount) / 100;

    // Calculate the points redemption value
    const pointsRedemptionPercentage: number = 5;
    const pointsRedemptionValue: number =
      (discountedPrice * pointsRedemptionPercentage) / 100;
    const points = pointsRedemptionValue * 4;
    const finalPrice: number = discountedPrice - pointsRedemptionValue;
    const discountedPriceString: string = finalPrice.toFixed();
    const imageUri =
      variant?.images && variant.images.length > 0
        ? variant.images[0]
        : 'https://st4.depositphotos.com/14953852/24787/v/1600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg';

    return (
      <View style={[styles.partContainer, { backgroundColor: COLORS.white }]}>
        <View>
          <View style={styles.itemHeader}>
            <View style={styles.ratingContainer}>
              <FastImage
                source={require('../../../assets/img/star1.png')}
                style={{ height: 14, width: 14, marginRight: moderateScale(5) }}
              />
              <AppText>
                {variant?.reviews && variant?.reviews?.length > 0
                  ? variant?.reviews[0]?.rating
                  : 0}
              </AppText>
            </View>
            <TouchableOpacity
              onPress={() =>
                handleFavorite(item?.product_id, variant?.variant_id)
              }>
              {isFavorite ? (
                <RedHeartIcon width={16} height={16} />
              ) : (
                <FavouriteIcon width={16} height={16} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(strings.DETAIL_PAGE, { data: item });
          }}
          style={styles.itemDetails}>
          <View style={styles.imageContainer}>
            <FastImage
              style={styles.images}
              resizeMode="contain"
              source={{ uri: imageUri }}
            />
          </View>
          <AppText
            numLines={2}
            size={14}
            family="PoppinsSemiB"
            children={`${item?.name} `}
          />
          <View style={styles.priceContainer}>
            <AppText size={14} family="PoppinsSemiB">
              ₹{discountedPrice.toFixed()}
            </AppText>
            <View style={{ marginLeft: moderateScale(5) }}>
              <AppText
                size={14}
                family="PoppinsLight"
                color={COLORS.grey54}
                underline="line-through">
                ₹{originalPrice.toFixed()}
              </AppText>
            </View>
          </View>
          <AppText size={13} family="PoppinsRegular" color="green">
            {points.toFixed() + ' ' + 'Point Redeem'}
          </AppText>
        </TouchableOpacity>
      </View>
    );
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([GetCategoryList(), GetProductList()]).finally(() =>
      setRefreshing(false),
    );
  }, []);
  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.content}>
        <CustomHeader2 navigation={navigation} scrollY={scrollY} />
        <Animated.ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <CustomInput
                height={50}
                iconLeft={<SearchIconBlack />}
                bgColor="white"
                placeholder="Search anything"
                value={search}
                setValue={setSearch}
                secure={false}
              />
            </View>
            <View style={styles.sliderView}>
              <SliderCorusel market={true} />
            </View>

            <MarketTabbar
              scrollY={scrollY}
              setSelectedTab={handleCategoryChange}
              categories={categoriesData}
            />
            <View style={styles.paddingContainer}>
              <View style={styles.header}>
                <AppText
                  size={20}
                  family="PoppinsMedium"
                  children={`${categoriesData[selectedTab]?.category_name}`}
                />
                <TouchableOpacity onPress={handlePresentModalPress}>
                  <FilterIconBlack />
                </TouchableOpacity>
              </View>
              {loadingProducts ? (
                <FlatList
                  numColumns={2}
                  data={[{}, {}]}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <Skeleton
                      type="box"
                      width="48%"
                      height={200}
                      borderRadius={10}
                    />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  columnWrapperStyle={styles.columnWrapper}
                />
              ) : productData.length > 0 ? (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  data={productData}
                  renderItem={renderItem}
                  keyExtractor={item => item.product_id.toString()}
                  columnWrapperStyle={styles.columnWrapper}
                />
              ) : (
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: 14,
                    fontFamily: 'PoppinsMedium',
                  }}>
                  No items available
                </Text>
              )}
            </View>
          </View>
        </Animated.ScrollView>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={Platform.OS === 'ios' ? iossnapPoints : snapPoints}
          onChange={handleSheetChanges}>
          <ProdutFilter
            filters={filters}
            setFilters={setFilters}
            applyFilters={applyFilters}
            handleResetFilter={handleResetFilters}
          />
        </BottomSheetModal>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default Market;
