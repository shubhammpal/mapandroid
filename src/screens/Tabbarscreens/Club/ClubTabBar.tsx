import { View, Text, SafeAreaView, Share } from 'react-native'
import React, { useContext, useState } from 'react'
import { COLORS } from '../../../style'
import { Tabs } from 'react-native-collapsible-tab-view'
import AppText from '../../../component/AppText/AppText'
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { AuthContext } from '../../../component/auth/AuthContext'
import ClubDetails from './ClubDetails'

const ClubTabBar = ({ navigation, route }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleIndexChange = (index: number) => {
    setActiveIndex(index);
    
  }

  const { userToken }: any = useContext(AuthContext);
  const [hide, setHide] = useState(false)
  let getGroupDetails = route?.params?.data
  const shareMessage = async () => {
    const getLink: any = await generateLink()
    try {
      const result = await Share.share({
        message: getLink,
        // You can also specify a URL or title here if needed
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
          console.log('Shared with activity type:', result.activityType);
        } else {
          // Shared successfully
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
        console.log('Share dismissed');
      }
    } catch (error: any) {
      console.error('Error sharing:', error.message);
    }
  };

  const generateLink = async () => {
    try {
      const link = await dynamicLinks().buildShortLink({
        link: `https://mytraclub.page.link/muUh?productId=${getGroupDetails?.id}`,
        domainUriPrefix: 'https://mytraclub.page.link',
        android: {
          packageName: 'com.mytra',
        },
        ios: {
          appStoreId: '6526488238',
          bundleId: 'com.mytra',
        },
      }, dynamicLinks.ShortLinkType.DEFAULT)
      console.log('link:', link)
      return link
    } catch (error) {
      console.log('Generating Link Error:', error)
    }
  }
  const CustomTab = ({ label }: any) => {
    return (
      <View style={{ flexDirection: "row", alignItems: 'center', }}>
        <AppText
          size={16}
          color={activeIndex == 2 ? COLORS.white : COLORS.grey54}
          family={'PoppinsMedium'}
          horizontal={10}>
          {label}
        </AppText>
      </View>
    )
  }
  return (
    <View style={{ backgroundColor: COLORS.black, flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: COLORS.black }} />
      <Tabs.Container
        renderHeader={() => <ClubDetails navigation={navigation} getGroupDetails={getGroupDetails} shareMessage={shareMessage} hide={hide} setHide={setHide} />}
        headerHeight={250}
        headerContainerStyle={{ backgroundColor: COLORS.black }}
        onIndexChange={handleIndexChange}
      >
        <Tabs.Tab name="My activities" label={() => <CustomTab label="Photos" />}>
          <Tabs.ScrollView style={{ backgroundColor: COLORS.black, flex: 1 }} pointerEvents='box-none' showsVerticalScrollIndicator={false} bounces={false}>
            {/* <Myactivities data={userdata?.data} profile={'profile'} /> */}
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="Clubs" label={() => <CustomTab label="Rides" />}>
          <Tabs.ScrollView style={{ backgroundColor: COLORS.black, flex: 1 }} showsVerticalScrollIndicator={false} bounces={false}>
            {/* <ClubScreen navigation={navigation} data={userdata?.data} /> */}
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="Groups" label={() => <CustomTab label="Members" />}>
          <Tabs.ScrollView style={{ backgroundColor: COLORS.black, flex: 1 }} showsVerticalScrollIndicator={false} bounces={false}>
            {/* <Group navigation={navigation} data={userdata?.data} /> */}
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container>
    </View>
  )
}

export default ClubTabBar