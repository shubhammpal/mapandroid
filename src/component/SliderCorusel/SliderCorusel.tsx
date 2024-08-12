import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
  Linking,
  Image,
} from 'react-native';
const { width } = Dimensions.get('window');
import { COLORS } from '../../style';
import { GetBannerList } from '../../services/api_Services';

const ITEM_SIZE =  width;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2.4;
const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

interface SliderCoruselProps {
  sheetRef?: any;
  market?: boolean; // Add market prop
}


export default function SliderCorusel({
  market = false,
}: SliderCoruselProps) {
  const [movies, setMovies] = React.useState<any>([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatListRef : any = React.useRef(null);
  const [banners, setBanners] = React.useState<any>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetBannerList();
        
        if (response && Array.isArray(response.payload)) {
          const filteredBanners = [
            {key: 'empty-left'},
            ...response.payload.filter(
              (banner: any) =>
                banner.type === (market ? 'Marketplace' : 'Homescreen'),
            ),
            {key: 'empty-right'},
          ];
          setBanners(filteredBanners);
          if (flatListRef?.current) {
            flatListRef?.current?.scrollToIndex({animated: false, index: 1});
          }
        } else {
          console.error(
            'Payload is not an array or response is invalid:',
            response,
          );
        }
      } catch (error) {
        console.error('Failed to fetch banners:', error);
      }
    };

    fetchData();
  }, [market]); // Depend on market to refetch if it changes

  if (banners.length === 0) {
    return <Loading />;
  }

  return (
    <View style={{}}>
     
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={banners}
        keyExtractor={(item) => item.key}
        horizontal
        style={{}}
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        snapToInterval={width}
        pagingEnabled
        snapToAlignment='start'
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }: any) => {
          if (!item?.image_url) {
            return <View style={{  }} />;
          }
          const inputRange = [
            (index - 1.2) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1.2) * ITEM_SIZE
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-ITEM_SIZE * 0.5, 0, ITEM_SIZE * 0.5]
          });
         
        
          return (
            <TouchableOpacity style={{ width: ITEM_SIZE}} onPress={()=>{
              if(item?.banner_link){
                Linking.openURL(item?.banner_link)
              }
              
            }} activeOpacity={0.8}>
              <View style={{
                shadowColor: "#000",
                shadowOpacity: 0.3,
                shadowRadius: 10,
                shadowOffset: {
                  width: 0,
                  height: 0
                },
                backgroundColor: 'black',
                width:ITEM_SIZE,
                
              }}>
                <View style={{
                  overflow: "hidden",
                  alignItems: 'center',
                }}>
                  <Image source={{ uri: item?.image_url }} style={{
                    width: ITEM_SIZE,
                    height: 170 ,
                    
                    resizeMode: 'stretch',
                  }} />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});


