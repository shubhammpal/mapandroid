import * as React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {HeartIconBlack, RedHeartIcon} from '../../assets/svgImg/SvgImg';
import {COLORS} from '../../style';
import {moderateScale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';

const {width} = Dimensions.get('window');
const ITEM_SIZE = width;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

interface SliderCorusel {
  image: any;
  fav: boolean |any;
}

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

const SliderCorusel2: React.FC<SliderCorusel> = ({image, fav}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatListRef: any = React.useRef(null);

  React.useEffect(() => {}, [image]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon}>
        {fav === 0 ? <HeartIconBlack width={25} height={25} /> : <RedHeartIcon width={25} height={25} />}
      </TouchableOpacity>
      <Animated.FlatList
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        data={image} // Using the image prop directly
        keyExtractor={(item, index) => index.toString()} // Key is index
        horizontal
        bounces={false}
        renderToHardwareTextureAndroid
        contentContainerStyle={{alignItems: 'center'}}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="center"
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.95} // Ensures smooth scrolling and snapping
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        renderItem={({item, index}: any) => {
          return (
            <View style={{width: ITEM_SIZE, backgroundColor: COLORS.white}}>
              <FastImage
                source={{uri: item}}
                resizeMode="contain"
                style={{
                  position: 'relative',
                  width: ITEM_SIZE,
                  height: 200,
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    marginHorizontal: 5,
  },
  posterImage: {
    width: ITEM_SIZE,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    position: 'relative',
    left: moderateScale(30),
    top: moderateScale(0),
  },
});

export default SliderCorusel2;
