import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './styles'
import { getAllRequestList, getAllRequestListAdmin, requestForNotiReadReject, requestJoinAcceptReject } from '../../services/api_Services'
import { AuthContext } from '../../component/auth/AuthContext'
import ImgView from '../../component/ImgView/ImgView'
import { COLORS, ms } from '../../style'
import AppText from '../../component/AppText/AppText'
import emitter from '../../component/Emitter/emitter'

const NotificationList = () => {
  const { userToken, userDetails }: any = useContext(AuthContext);
  const [notification, setNotification] = useState<any>()
  const [notificationAdmin, setNotificationAdmin] = useState<any>()
  useEffect(() => {
    Getgroupdetails()
  }, [])

  const Getgroupdetails = async () => {
    const apiData = { userId: userDetails?.id, token: userToken };
    try {
      await getAllRequestList(apiData).then(async (res: any) => {
        
        if (res?.status == true) {
          setNotification(res?.notifications)
        }
      });
    } catch (error) {
      console.log('Details response: ', error);
    }
  };

  

  const JoinComunityApi = async (item: any, status: boolean) => {
    
    const data: any = {
      userId: item?.accepted_by ? item?.accepted_by : userDetails?.id,
      token: userToken,
      id: item?.entity_id,
      type: item?.notification_type == "event" ? "events" : item?.notification_type,
      isAccepted: status
    };
    
    try {
      const res = await requestJoinAcceptReject(data);
      if (res?.status == true) {
        const datas = { heading: 'login', message: res?.message };
        emitter.emit('alert', datas);
      } else {
        const data = {
          heading: 'failed',
          message: res?.message,
        };
        emitter.emit('alert', data);
      }
      
      Getgroupdetails()
      RejectNotificationRead(item)
    } catch (error) {
      console.log('Follow user response: ', error);
    }
  };

  const RejectNotificationRead = async (item: any, status?: boolean) => {
    const data: any = {
      notification_id: item?.id,
      token: userToken
    };
    
    try {
      const res = await requestForNotiReadReject(data);
      
      if (res?.status == true) {
        const datas = { heading: 'login', message: res?.message };
        emitter.emit('alert', datas);
      } else {
        const data = {
          heading: 'failed',
          message: res?.message,
        };
        emitter.emit('alert', data);
      }
      
      Getgroupdetails()
    } catch (error) {
      console.log('Follow user response: ', error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView automaticallyAdjustContentInsets contentInsetAdjustmentBehavior='automatic' style={{ flex: 1, paddingHorizontal: ms(2), paddingTop: 20 }}>
        
        {
          notification && (
            <>
              {
                notification.map((item: any, index: number) => {
                  
                  return (
                    <View style={styles.listContainer} key={index}>
                      <View style={{flexDirection:'row', alignItems: 'center',gap: 10, flex: 1, paddingRight: 40}}>
                        <View style={{alignSelf: 'flex-start',marginTop: 5}}>
                        <ImgView height={35} width={35} url={item?.image? item?.image : require('../../assets/img/noimage.png')} radius={35} dummy={item?.image ? false : true} />
                        </View>
                        <AppText size={14} color='white' family='PoppinsMedium'>A request has come from the <AppText size={15} color='white' family='PoppinsBold'>{item?.entity_name}</AppText>.</AppText>
                      </View>
                      <View style={{flexDirection:'row', alignItems: 'center',gap: 8, alignSelf: 'flex-start', marginTop: 5}}>
                        <TouchableOpacity style={[styles.buttonContainer, {backgroundColor: COLORS.blue}]} onPress={()=>JoinComunityApi(item, true)}>
                          <AppText size={14} color='white' family='PoppinsMedium'>Confirm</AppText>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonContainer, {backgroundColor: COLORS.grey54}]} onPress={()=>RejectNotificationRead(item, false)}>
                          <AppText size={14} color='white' family='PoppinsMedium'>Delete</AppText>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )
                })
              }
            </>
          )
        }
      </ScrollView>
    </View>
  )
}

export default NotificationList