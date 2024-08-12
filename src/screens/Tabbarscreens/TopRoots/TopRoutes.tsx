import React from 'react';
import { View, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import SimpleHeader from '../../../component/header/Header';
import { black } from '../../../style/Colors';
import TopRoutesCard from './TopRouteCard';
import { strings } from '../../../utils/strings';
import { ms } from '../../../style';

const data = [
  {
    id: 1,
    place: 'Pune - Malshej  Ghat',
    time: '3 H 45 M',
    distance: '124 K.M',
    image:require('../../../assets/img/MalshejGhat.png'),
    desc:'Riding from Pune to Malshej Ghat by bike is an enchanting experience, filled with scenic beauty and thrilling curves. The journey offers lush green landscapes, especially vibrant during the monsoon season. As you ascend, the cool mountain breeze and occasional waterfalls add to the charm. The roads are well-maintained, making for a smooth and enjoyable ride. The breathtaking views from the top of the Ghat are the perfect reward for the adventure.'
  },
  {
    id: 2,
    place: 'Pune - Mahabaleshwar',
    time: '3 H 36 M',
    distance: '121 K.M',
    image:require('../../../assets/img/punemahabaleshwar.png'),
    desc:'The ride from Pune to Mahabaleshwar by bike is a delightful journey through picturesque landscapes. The route winds through rolling hills and lush greenery, offering stunning views at every turn. The cool breeze and the aroma of fresh mountain air make the ride refreshing. Well-paved roads ensure a smooth ride, enhancing the overall experience. As you approach Mahabaleshwar, the breathtaking vistas of valleys and forests provide a perfect climax to the trip.'
  },
  {
    id: 3,
    place: 'Pune - Matheran',
    time: '6 H 45 M',
    distance: '124 K.M',
    image:require('../../../assets/img/Matheran.png'),
    desc:"Riding from Pune to Matheran by bike is a captivating journey through the Western Ghats. The route is lined with dense forests and scenic vistas, especially breathtaking during the monsoon. As you approach Matheran, the narrow, winding roads offer thrilling hairpin bends and panoramic views. The absence of motor vehicles in Matheran enhances the serene and pristine atmosphere. The journey culminates in the peaceful, vehicle-free hill station, providing a perfect escape from the city's hustle and bustle."
  },
  {
    id: 4,
    place: 'Pune - Alibaug',
    time: '2 H 45 M',
    distance: '140 K.M',
    image:require('../../../assets/img/alibag.png'),
    desc:"The ride from Pune to Alibaug by bike is a scenic adventure through diverse landscapes. The journey takes you through lush countryside, quaint villages, and stretches of coastal roads. The fresh sea breeze and the sight of coconut palms swaying add to the coastal charm. The well-maintained roads make for a smooth and enjoyable ride, perfect for bike enthusiasts. Arriving at Alibaug, the pristine beaches and the sound of waves offer a relaxing end to the beautiful trip."
  },
  {
    id: 5,
    place: 'Pune - Aamby Valley',
    time: '1 H 45 M',
    distance: '75 K.M',
    image:require('../../../assets/img/routeHome1.png'),
    desc:"The ride from Pune to Aamby Valley by bike is a scenic adventure through diverse landscapes. The journey takes you through lush countryside, quaint villages, and stretches of coastal roads. The fresh sea breeze and the sight of coconut palms swaying add to the coastal charm. The well-maintained roads make for a smooth and enjoyable ride, perfect for bike enthusiasts. Arriving at Alibaug, the pristine beaches and the sound of waves offer a relaxing end to the beautiful trip."
  },
 
];

const TopRoutes = ({ navigation }: any) => {

  const renderItem = ({ item, index }: { item: any; index: any }) => {
    return (
      <TopRoutesCard
        onpress={() => { navigation.navigate(strings.TopRoute_DETAIL,{'item':item,"imageData":item?.image}) }}
        place={item?.image}
        placeName={item?.place}
        time={item?.time}
        distance={item?.distance}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* <SimpleHeader label="Top Routes" navigation={navigation} /> */}

        <FlatList
          data={data}
          renderItem={renderItem}
          bounces={false}
          style={{paddingBottom:ms(10)}}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 30, paddingTop: 16,width:'90%',alignSelf:'center' }}
        />
        
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black,
  },

});

export default TopRoutes;
