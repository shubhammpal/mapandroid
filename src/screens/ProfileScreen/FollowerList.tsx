
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Image, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { COLORS } from '../../style'
import { styles } from './styles'
import AppText from '../../component/AppText/AppText'
import { ArrowBAckIcon } from '../../assets/svgImg/SvgImg'
import { fonts } from '../../utils/misc'
import { AuthContext } from '../../component/auth/AuthContext'
import { requestFollowlist } from '../../services/api_Services'
import FastImage from 'react-native-fast-image'

const FollowerList = ({ navigation, route }: any) => {
    const { userDetails, userToken }: any = useContext(AuthContext);
    const [searchingText, setSearchingText] = useState<any>('');
    const [followeData, setFolloweData] = useState<any>([]);

    useEffect(() => {
        GetFolloweList()
    }, [])

    const GetFolloweList = async () => {
        const apiData = { user_id: route?.params?.id, token: userToken, login_user_id: userDetails?.id };
        try {
            await requestFollowlist(apiData).then(async (res: any) => {
                if (res?.success) {
                    const data = route?.params?.title === 'Following' ? res?.followings : res?.followers;
                    setFolloweData(data);
                }
            });
        } catch (error) {
            console.log('PostList response: ', error);
        }
    };

    const filteredData = followeData.filter(item =>
        item.user_name.toLowerCase().includes(searchingText.toLowerCase()) ||
        item.full_name.toLowerCase().includes(searchingText.toLowerCase())
    );

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <SafeAreaView />
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <View style={styles.followarrow}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <ArrowBAckIcon active={COLORS.white}/>
                            </TouchableOpacity>
                            <AppText
                                size={20}
                                color={COLORS.white}
                                family="PoppinsSemiB"
                                horizontal={20}>
                                {route?.params?.title}
                            </AppText>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                        <View style={[styles.SearchBox]}>
                            <View style={styles.inputBox}>
                                <TextInput
                                    value={searchingText}
                                    style={styles.input2}
                                    placeholderTextColor={COLORS.grey92}
                                    placeholder="Search"
                                    onChangeText={(text) => setSearchingText(text)}
                                    keyboardType="default"
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginVertical: 10 }}>
                        {filteredData.length > 0 ? (
                            filteredData
                                .filter(item => item.id === userDetails?.id)?.concat(
                                    filteredData.filter(item => item.id !== userDetails?.id)
                                )
                                .map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={item?.id}
                                            style={styles.inviteContainer}
                                            onPress={() => navigation.push('Profile', {
                                                id: item?.id
                                            })}
                                        >
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <FastImage
                                                    source={
                                                        item?.profile_picture == null
                                                            ? require('../../assets/img/profilepic.jpg')
                                                            : { uri: item?.profile_picture }
                                                    }
                                                    style={styles.item}
                                                />
                                                <View style={{ width: "60%" }}>
                                                    <AppText
                                                        size={18}
                                                        color={COLORS.white}
                                                        family={fonts.QuicksandSemi}
                                                        horizontal={15}>
                                                        {item?.user_name}
                                                    </AppText>
                                                    <AppText
                                                        size={16}
                                                        color={COLORS.greyAD}
                                                        family={fonts.QuicksandSemi}
                                                        horizontal={15}>
                                                        {item?.full_name}
                                                    </AppText>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                        ) : (
                            <AppText
                                size={16}
                                color={COLORS.greyAD}
                                family={fonts.QuicksandSemi}
                                horizontal={15}>
                                No results found
                            </AppText>
                        )}
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default FollowerList
