import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './styles'
import { ArrowBAckIcon } from '../../../assets/svgImg/SvgImg'
import AppText from '../../../component/AppText/AppText'
import { COLORS } from '../../../style'
import { fonts } from '../../../utils/misc'
import SubmitButton from '../../../component/ButtonCotainer/SubmitButton'
import { strings } from '../../../utils/strings'
import { AuthContext } from '../../../component/auth/AuthContext'
import { getAttendenceList, getEventRideData, requestRideHistoryApi } from '../../../services/api_Services'

const Attendance = ({ navigation, route }: any) => {
  const data = route?.params?.data
  const [checkedUsers, setCheckedUsers] = useState<any[]>([]);
  const { userDetails, userToken }: any = useContext(AuthContext);
  const [rideHistoryStartData, setRideHistoryStartData] = useState<any>();
  const [rideDetails, setRideDetails] = useState<any>()
  const [loader, setloader] = useState(false);

  const toggleChecked = (userId: any) => {
    let updatedUsers = [...checkedUsers];
    if (updatedUsers.includes(userId)) {
      updatedUsers = updatedUsers.filter(id => id != userId);
    } else {
      updatedUsers.push(userId);
    }
    setCheckedUsers(updatedUsers);
    handleNext(updatedUsers, userId)
  };

  const handleNext = (updatedUsers: any, userId: any) => {
    const action = updatedUsers.includes(userId) ? 'add' : 'remove';
    fetch('http://3.111.234.55:6004/group/events/mark-attendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventId: data?._id,
        userId: userId,
        action: action,
      }),
    })
      .then(response => response.json())
      .then(res => {
        // Handle API response
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });

  };

  useEffect(() => {
    getEventRideDetails()
    getEventRideDetailsStartCheck()
  }, [])

  const getEventRideDetails = async () => {
    if (data) {
      const apiData = { token: userToken, eventId: data?._id };
      try {
        await getAttendenceList(apiData).then(async (res: any) => {
          
          if (res?.event) {
            let riderAttend: any = []
            res?.event?.attendance.map((rider: any) => {
              riderAttend.push(rider?.userId?.id);
            })
            setCheckedUsers(riderAttend)
          }
        });
      } catch (error) {
        console.log('attendence response: ', error);
      }
    }
  };

  const placesPostData = async () => {
    const apiData = {
      userId: userDetails?.id,
      start: 1,
      eventId: data?._id,
      token : userToken
    }
    try {
      await requestRideHistoryApi(apiData)
        .then(async (res: any) => {
          if (res?.status == true) {
            getEventRideDetailsStartCheck()
            setRideHistoryStartData(res?.payload)
          }
          setloader(false)
          navigation.navigate("GroupRide", data)
        })
    } catch (error) {
      console.log("Places api response  response: ", error);
      setloader(false)
    }
  }

  const getEventRideDetailsStartCheck = async () => {
    const apiData = { token: userToken, eventId: data?._id };
    try {
      await getEventRideData(apiData).then(async (res: any) => {
        
        if (res) {
          if (res.length > 0) {
            setRideDetails(res)
          } 
        }
      });
    } catch (error) {
      console.log('PostList response: ', error);
    }
  };
  return (
    <View style={styles.savecontainerModal}>
      <SafeAreaView />
      <ScrollView contentContainerStyle={[styles.repeatmodalView, { flexGrow: 1, alignSelf: 'center', }]} bounces={false}>
        <View style={{
          flex: 1, marginTop: 15, marginHorizontal: 15,
        }}>
          <View style={styles.topHeaderSafe}>
            <TouchableOpacity style={styles.closeButton} onPress={() => { navigation.goBack() }}>
              <ArrowBAckIcon />
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
              <AppText size={20} color={COLORS.white} family='PoppinsBold' align='center'>
                Attendance
              </AppText>
            </View>
          </View>
          {
            data && (
              data?.registeredUsersDetails?.map((item: any, index: number) => {
                const itemList = item?.userDetails
                
                return (
                  <TouchableOpacity key={itemList?.id} style={{
                    flexDirection: 'row', alignItems: 'center',
                    marginTop: 20, justifyContent: 'space-between'
                  }} onPress={() => toggleChecked(itemList?.id)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={
                          itemList?.profile_picture == null
                            ? require('../../../assets/img/profilepic.jpg')
                            : { uri: itemList?.profile_picture }
                        }
                        style={{ width: 50, height: 50, borderRadius: 25 }}
                      />
                      <AppText
                        size={16}
                        color={COLORS.white}
                        family={fonts.QuicksandSemi}
                        horizontal={25}>
                        {itemList?.full_name}
                      </AppText>

                    </View>

                    <TouchableOpacity style={{ marginRight: 20, justifyContent: 'center' }} onPress={() => toggleChecked(itemList?.id)}>
                      <View style={styles.checkBox}>
                        {
                          checkedUsers.includes(itemList?.id) ? (
                            <Image
                              style={styles.check}
                              source={require('../../../assets/img/checkmark.png')}
                            />
                          ) : (
                            <></>
                          )
                        }
                      </View>
                    </TouchableOpacity>
                    
                  </TouchableOpacity>
                )
              })
            )
          }

        </View>
        <View style={{ marginVertical: 50, marginHorizontal: 15 }}>
          <SubmitButton
            title={'Next'}
            pressing={() => {
              setloader(true)
              if(rideDetails){
                navigation.navigate("GroupRide", data)
                setloader(false)
              } else{
                placesPostData()
              }
            }}
            widthOf={'100%'}
            loader={loader}
            height={46}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default Attendance