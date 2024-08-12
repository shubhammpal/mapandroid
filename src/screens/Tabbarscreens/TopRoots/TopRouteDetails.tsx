import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  ArrowBAckIcon,
  ArrowRight,
  BikeCCIcon,
  BikeIconWhite,
  FavouriteIcon,
  FavouriteIconRed,
  FavouriteIconWhite,
  RestaurantIcon,
  ShareIcon,
  TimeHomeIcon,
  TimeIcon,
} from '../../../assets/svgImg/SvgImg';
import AppText from '../../../component/AppText/AppText';
import SubmitButton from '../../../component/ButtonCotainer/SubmitButton';
import SimpleHeader from '../../../component/header/Header';
import { COLORS, ms } from '../../../style';
import Swiper from 'react-native-swiper'
import { fonts } from '../../../utils/misc';
import LinearGradient from 'react-native-linear-gradient';

interface RouteDetailsProps {
  navigation: any;
  route: any
}
const slides = [
  { id: '1', title: 'Slide 1', description: 'This is the first slide', image: require('../../../assets/img/natureImage1.png') },
  { id: '2', title: 'Slide 2', description: 'This is the second slide', image: require('../../../assets/img/natureImage2.png') },
  { id: '3', title: 'Slide 3', description: 'This is the third slide', image: require('../../../assets/img/natureImage3.png') },
  { id: '4', title: 'Slide 4', description: 'This is the third slide', image: require('../../../assets/img/natureImage4.png') },
];



const TopRouteDetails = ({ navigation, route }: any) => {
  const [isLiked, setIsLiked] = useState(false)
  const singleImage = route?.params?.imageData;

  const slides = [
    {
      id: '0', image: route?.params?.imageData == 7 ?
        require('../../../assets/img/MalshejGhat.png') :
        route?.params?.imageData == 8 ?
          require('../../../assets/img/punemahabaleshwar.png') :
          route?.params?.imageData == 9 ?
            require('../../../assets/img/Matheran.png') :
            route?.params?.imageData == 10 ?
              require('../../../assets/img/alibag.png') :
              route?.params?.imageData == 11 &&
              require('../../../assets/img/routeHome1.png')
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.container}>

          <Swiper
            style={styles.wrapper}
            showsButtons={true}
            autoplay={true}
            autoplayTimeout={3}
            showsPagination={false}
          >
            {slides.map(slide => (
              <View key={slide.id} style={styles.slide}>
                <Image source={slide.image} style={styles.image} />
              </View>
            ))}
          </Swiper>


          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            top: ms(3.5),
            position: 'absolute',
            width: '100%'
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                {/* <ArrowRight /> */}
              </TouchableOpacity>
              <AppText
                size={15}
                horizontal={12}
                family="PoppinsBold"
                color={COLORS.white}>
                {route?.params?.item?.place}
              </AppText>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => { setIsLiked(!isLiked) }}>
                {isLiked ? <FavouriteIconRed /> : <FavouriteIconWhite />}
              </TouchableOpacity>
             
            </View>
          </View>
          <Text style={styles.imageCaption}>
            “Remember to ride with safety gears”
          </Text>
        </View>


        <View style={{ paddingHorizontal: 18 }}>
          <View style={styles.routeInfoContainer}>
            <AppText size={15}
              family="PoppinsSemiB"
              color={COLORS.white}>
              About the route
            </AppText>
            <AppText size={12}
              family={'PoppinsMedium'}
              color="white">
              {route?.params?.item?.desc}
            </AppText>
            <View style={{ marginVertical: 15, gap: 10 }}>
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <AppText
                  size={12}
                  horizontal={5}
                  family="PoppinsSemiB"
                  color={COLORS.white}>
                  <BikeIconWhite />
                  {route?.params?.item?.distance + ' ' + route?.params?.item?.place.split(' ')[0]}
                </AppText>
              </View>
              <View style={{ alignItems: 'center', flexDirection: 'row', paddingHorizontal: 3 }}>
                <TimeHomeIcon />
                <AppText
                  size={13}
                  horizontal={10}
                  family="PoppinsSemiB"
                  color={COLORS.white}>
                  3 H 25 M
                </AppText>
              </View>


            </View>
          </View>

          <View style={styles.submitButton}>
            {/* <SubmitButton title="Start Now" widthOf={'40%'} pressing={() => { }} /> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.black,
    paddingBottom: 40
  },
  image: {
    width: '100%',
    height: 260,
  },
  imageCaption: {
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: fonts.PoppinsLight,
    bottom: 12
  },
  routeInfoContainer: {
    borderRadius: 10,
    gap: 10,
  },
  routeTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  aboutText: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 8,
  },
  routeDetail: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 4,
  },
  suitedRouteTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  routeOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: 10,
    marginBottom: 10,
  },
  routeOptionButton: {
    backgroundColor: '#444',
    borderRadius: 10,
    padding: 12,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  startButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginVertical: 16,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: ms(3)
  },


  wrapper: {
    height: 300,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default TopRouteDetails;
