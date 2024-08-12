import React, { useCallback, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView, FlatList, Animated, Platform, Modal, TouchableWithoutFeedback } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BellIcon, CommunityIcon, CreateAddIcon, CrossRedIcon, DoubleStarIcon, EventsIcon, FeedActiveIcon, FeedIcon, GroupIcon, MainDrawerIcon, RootsIcon } from '../../assets/svgImg/SvgImg';
import { COLORS } from '../../style';
import { fonts } from '../../utils/misc';
import { BlurView } from '@react-native-community/blur';
import AppText from '../../component/AppText/AppText';
import { strings } from '../../utils/strings';
import { getAllRequestList } from '../../services/api_Services';
import { AuthContext } from '../../component/auth/AuthContext';
const CustomHeader = ({ scrollY ,navigation,setScreenData,setHeaderData,dismissKeyboard}: any) => {
  
  const { userDetails, userToken }: any = useContext(AuthContext)
  const [notification, setNotification] = useState<any>([])
  const data = [{ key: 1, job: "Feeds", img: <FeedIcon />, extraImg: <FeedActiveIcon /> },{ key: 2, job: "Routes", img: <RootsIcon />, extraImg: '' }, { key: 3, job: "Clubs", img: <CommunityIcon />, extraImg: '' }, { key: 4, job: "Rides", img: <EventsIcon />, extraImg: '' }];
  const _colors = {
    active: COLORS.blue,
    inactive: COLORS.black2F,
  };
  const _spacing = 10;
  const ref = React.useRef<FlatList>(null)
  const [index, setIndex] = React.useState(0)
  const [viewPosition, setViewPosition] = React.useState(0.5)
  React.useEffect(() => {
    ref.current?.scrollToIndex({
      index,
      animated: true,
      viewOffset: _spacing,
      viewPosition: 0.5,
    })
  }, [index, viewPosition])

  const HEADER_HEIGHT = 160
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT)
  const headerY = diffClampScrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  useFocusEffect(
    useCallback(() => {
      Getgroupdetails()
    }, []),
  );

 

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
  return (
    <>
     
    <Animated.View style={{ height: HEADER_HEIGHT, transform: [{ translateY: headerY }], }}>

      <BlurView style={{}} blurType="dark" blurAmount={15} overlayColor={'transparent'}>

        <View style={[styles.headerContainer, { backgroundColor: 'rgba(0,0,0,0.7)', }]}>
          <SafeAreaView />
          <View style={styles.topRow}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.openDrawer()}>
              <MainDrawerIcon />
            </TouchableOpacity>
            <View style={styles.rightHeader}>
              <TouchableOpacity style={styles.button} onPress={() => setScreenData(1)}>
                <CreateAddIcon />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("NotificationList")}>
                <BellIcon />
                {
                  notification.length > 0 && (
                    <View style={styles.bellIconButton} />
                  )
                }
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            ref={ref}
            style={{ flexGrow: 0, marginTop: 10, marginBottom: 10, }}
            scrollEnabled={true}
            data={data}
            keyExtractor={(item: any) => item?.key}
            contentContainerStyle={{ paddingLeft: _spacing, justifyContent: 'space-between', alignItems: 'center',  }}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item, index: fIndex }) => {
              return (
               
                <TouchableOpacity style={{  }} onPress={() => {
                  setIndex(fIndex)
                  setHeaderData(item?.key)
                  setScreenData(2)
                }}>
                  <View
                    style={{
                      marginRight: _spacing,
                      paddingVertical: 5,
                      height: 35,
                      paddingHorizontal: 15,
                      borderRadius: 4,
                      backgroundColor: fIndex == index ? _colors.active : _colors.inactive,
                      flexDirection: "row",
                      alignItems: 'center',
                      gap: 10,
                      justifyContent: 'center',
                    }}>

                    {index == 0 ? fIndex == index ? item?.extraImg : item.img : item.img}
                    <AppText color={COLORS.white} size={14} family={'PoppinsRegular'}>{item?.job}</AppText>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </BlurView>
    </Animated.View>
   
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 10,

  },
  container: {
    width: "100%",
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: Platform.OS == 'ios' ? 0 : 10
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: 'center',
    gap: 10
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'blue',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconRow: {
    flexDirection: 'row',
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
  modalText: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: fonts.PoppinsMedium,
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(19, 19, 19, 0.9)',
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.black3030,
    borderRadius: 10,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modelTouch: {
    alignSelf: 'flex-end',
    top: -15, right: -10,
    position: 'absolute',
    borderRadius: 50,
  },
  bellIconButton: {height: 8, width: 8, borderRadius: 8, backgroundColor: COLORS.red, position:"absolute", alignSelf:"flex-end", right: 10, top: 10}
});

export default CustomHeader;
