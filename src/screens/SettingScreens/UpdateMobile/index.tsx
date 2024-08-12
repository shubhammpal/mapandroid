import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, Platform, Modal, SafeAreaView, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { LoginValidationSchema } from '../../../utils/Schema'
import { Formik } from 'formik'
import AppText from '../../../component/AppText/AppText'
import { COLORS, ms } from '../../../style'
import SubmitButton from '../../../component/ButtonCotainer/SubmitButton'
import { ArrowBAckIcon, MobileIcon } from '../../../assets/svgImg/SvgImg'
import { styles } from '../styles'
import { strings } from '../../../utils/strings'
import { requestUpdateMobile, requestVerifyOtp } from '../../../services/api_Services'
import { AuthContext } from '../../../component/auth/AuthContext'
import emitter from '../../../component/Emitter/emitter'
import { setUserData } from '../../../services/auth_helper'

type UpdateMobileProps = {
    navigation: any
}
const UpdateMobile = ({ navigation }: UpdateMobileProps) => {
    const [loader, setLoader] = useState<any>(false);
    const { userDetails, setUserDetails }: any = useContext(AuthContext);

    const UpdateMobileSubmit = async (formattedMobileNumber: any) => {
        const apiData = { newMobileNumber: formattedMobileNumber, user_id: userDetails?.id }
        try {
            await requestUpdateMobile(apiData)
                .then(async (res: any) => {
                    Alert.alert(JSON.stringify(res))
                    if (res?.message == 'OTP sent successfully to the new mobile number.') {
                        navigation.navigate(strings.OTP, {
                            mobile: formattedMobileNumber,
                            otp: res?.OTP,
                            page:'Update'
                          });
                          setLoader(false)
                    } else {
                        const data = { heading: "failed", message: res?.message ? res?.message : "Something went wrong" }
                        emitter.emit("alert", data)
                        setLoader(false)
                    }
                })
        } catch (error) {
            console.log("Login response: ", error);
            setLoader(false)
        }
    }
    const VerifyOtpPress = async (apiData: any, formattedMobileNumber: any) => {
        const api = { mobile: formattedMobileNumber, otp: apiData }
        setLoader(true)
        try {
            await requestVerifyOtp(api)
                .then(async (res: any) => {
                    
                    if (res?.success == true) {
                        await setUserData(res?.payload)
                        setUserDetails(res?.payload);
                        const data = { heading: "login", message: 'Mobile number update successful' }
                        emitter.emit("alert", data)
                        navigation.goBack()
                    }
                    setLoader(false)
                })
        } catch (error) {
            const data = { heading: "failed", message: "Something went wrong" }
            emitter.emit("alert", data)
            console.log("OTP response: ", error);
            setLoader(false)
        }
    }

    const formatMobileNumber = (mobile: any) => {
        return mobile.replace(/^(\d{5})(\d{5})$/, '$1 $2');
    };


    return (
        <ScrollView style={styles.updatecontainer} bounces={false}>
            <SafeAreaView />
            <View style={styles.updatecontainer}>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 15, paddingRight: 15 }}>
                            <ArrowBAckIcon />
                        </TouchableOpacity>
                        <AppText
                            size={20}
                            color={COLORS.white}
                            family="PoppinsSemiB"
                            horizontal={10}>
                            Update Mobile Number
                        </AppText>
                    </View>
                    <View style={{ marginHorizontal: ms(0) }}>
                        <View style={styles.sharedView}>
                            <Image source={require('../../../assets/img/bikelogo.png')} style={styles.logoImage} resizeMode='contain' />
                        </View>
                        <Formik
                            initialValues={{
                                mobileNumber: userDetails?.mobile ? formatMobileNumber(userDetails.mobile) : '',
                            }}
                            validationSchema={LoginValidationSchema}
                            onSubmit={(values) => {
                                setLoader(true)
                                let formattedMobileNumber = values?.mobileNumber.replace(/\s/g, '');
                                UpdateMobileSubmit(formattedMobileNumber)
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
                                <View style={{ marginTop: ms(8) }}>
                                    <View style={styles.textContainer}>
                                        <AppText size={14} color={COLORS.greyCD} family='PoppinsMedium'>{strings.MOBILE_NUMBER}</AppText>

                                        <View style={[styles.textinputContainer, { borderColor: errors.mobileNumber && touched.mobileNumber ? COLORS.fadeRrrorRed : '#434344', }]}>
                                            <TextInput
                                                style={styles.mobile}
                                                onChangeText={(text) => {
                                                    const formattedText = text.replace(/\D/g, '');
                                                    let formattedMobileNumber = '';
                                                    if (formattedText.length > 5) {
                                                        formattedMobileNumber =
                                                            formattedText.slice(0, 5) + ' ' + formattedText.slice(5, 10);
                                                    } else {
                                                        formattedMobileNumber = formattedText;
                                                    }
                                                    handleChange('mobileNumber')(formattedMobileNumber)
                                                }}
                                                onBlur={handleBlur('mobileNumber')}
                                                value={values.mobileNumber}
                                                maxLength={11}
                                                keyboardType='number-pad'
                                                placeholderTextColor={COLORS.semiAAA}
                                                placeholder="+91 99260 12345"
                                            />
                                            <TouchableOpacity>
                                                <MobileIcon />
                                            </TouchableOpacity>
                                        </View>
                                        {errors.mobileNumber && touched.mobileNumber &&
                                            <AppText size={12} color={COLORS.fadeRrrorRed} family='PoppinsMedium' align='right'>{errors.mobileNumber}*</AppText>
                                        }
                                    </View>
                                    <View style={{ marginTop: ms(2) }}>
                                        <SubmitButton title={'Update'} pressing={handleSubmit} widthOf={'100%'} loader={loader} />
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                </View>

            </View>
        </ScrollView>

    )
}

export default UpdateMobile