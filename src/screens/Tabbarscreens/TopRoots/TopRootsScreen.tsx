import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppText from '../../../component/AppText/AppText';
import { COLORS } from '../../../style';
import { styles } from './styles';
import { DistanceIcon, LoveInactiveIcon, RouteCalendar, RouteIcon, TimeIcon } from '../../../assets/svgImg/SvgImg';
import { AuthContext } from '../../../component/auth/AuthContext';
import { requestAddtofav } from '../../../services/api_Services';

const TopRootsScreen = ({ navigation, route }: any) => {
  
  const [recentDataP, setRecentDataP] = useState<any[]>();
  const { userToken, userDetails }: any = useContext(AuthContext);
  
  const fetchRecentSearches = async () => {
    try {
      const response = await fetch(`http://3.111.234.55:6002/api/map/ride-list?userId=${route.params?.data != 'data' ? route.params?.data :userDetails?.id}`);

      const data = await response.json();
     
      setRecentDataP(data?.bikeRides);
    } catch (error) {
      console.error('Error fetching recent searches:', error);
    }
  };
  useEffect(() => {

    fetchRecentSearches();
  }, []);

  const dateFetch = (dateStr: any) => {

    const date = new Date(dateStr);

    // Extract the day, month, and year
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are zero-indexed
    const year = date.getUTCFullYear();

    // Format the date as dd-mm-yyyy
    const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

    return formattedDate; // Output: "14-06-2024
  }
  
  const AddTofavApi = async (rideId,status) => {
    const data = {
      userId: userDetails?.id,
      rideId: rideId,
      token:userToken
    };
    try {
      await requestAddtofav(data).then(
        (res) => {
          
          fetchRecentSearches()
        },
      );
    } catch (error) {
      console.log('Create group response: ', error);
    }
  };
  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollview} showsVerticalScrollIndicator={false}>
        {
          recentDataP && (
            <>
              {recentDataP.map((item, i) => {
                const createdDate : any = new Date(item?.createdAt);
                const updatedDate : any = new Date(item?.updatedAt);
                
                // Calculate the difference in milliseconds
                const differenceInMilliseconds = updatedDate - createdDate;
                
                // Convert the difference to total minutes
                const differenceInMinutes = Math.floor(differenceInMilliseconds / 1000 / 60);
                
                // Calculate the hours and remaining minutes
                const hours = Math.floor(differenceInMinutes / 60);
                const minutes = differenceInMinutes % 60;
                // const arr = item?.mapFinalResponse[0]?.routes[0]
                return (
                  <TouchableOpacity key={item?.id} style={styles.mainContainer} onPress={()=>{
                    // if(route?.params){
                      navigation.navigate('MapPath', item)
                    // }
                  }}>
                    <View style={styles.imageVuiew}>
                      <Image
                        source={require('../../../assets/img/route1.png')}
                        style={styles.item}
                        resizeMode='contain'
                      />
                    </View>
                    <View style={styles.titleView}>
                      <AppText size={18} color={COLORS.white} family='PoppinsMedium' numLines={2}>{item?.endAddress}</AppText>

                      <View style={styles.dateView}>
                        <View style={{ flexDirection: 'row', width: '48%', }}>
                          <RouteCalendar />
                          <AppText size={14} color={COLORS.greyB0B0} family='PoppinsRegular' horizontal={8}>{dateFetch(item?.updatedAt)} </AppText>
                        </View>
                        <View style={{ flexDirection: 'row', width: '45%', }}>
                          <DistanceIcon />
                          <AppText size={14} color={COLORS.greyD9} family='PoppinsLight' horizontal={8}>{item?.rideKm} km</AppText>
                        </View>
                      </View>
                      <View style={styles.dateView}>
                        <View style={{ flexDirection: 'row', width: '48%', }}>
                          <TimeIcon />
                          <AppText size={14} color={COLORS.greyB0B0} family='PoppinsRegular' horizontal={8}>{`${hours} h ${minutes} min`} </AppText>
                        </View>
                        
                      </View>

                    </View>
                    <TouchableOpacity onPress={()=>AddTofavApi(item?._id,1)}>
                    <Image
                        source={require('../../../assets/img/star1.png')}
                        style={styles.starticon}
                        resizeMode='contain'
                        tintColor={item?.favoriteCount == 1 ? "#FFA929":null}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                )
              })}
            </>
          )
        }

    </ScrollView>
      </View>
  );
}
export default TopRootsScreen

