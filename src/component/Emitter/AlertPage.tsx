import React, { useRef } from "react";
import { useEffect, useState, useContext } from "react";
import { StyleSheet, Animated, Dimensions, View, Text, TouchableOpacity, Platform, } from "react-native";
import emitter from "./emitter";
import { COLORS, ms } from "../../style";
import { shadowStyle } from "../../style/typography";
import AppText from "../AppText/AppText";
import { CrossIcon, ErrorIcon, InfoIcon, SuccessIcon } from "../../assets/svgImg/SvgImg";
import LinearGradient from "react-native-linear-gradient";

const WIDTH = Dimensions.get("screen").width;

const AlertPage = () => {
    const [alert_name, setAlertName] = useState("");
    const [message, setMessage] = useState("");
    const slideup = useRef(new Animated.Value(0)).current;
    let autohidetime = 3100;
    let timeout_id: any = null;

    const emitListener = (t_alert_name: any) => {
        if (t_alert_name?.heading && t_alert_name?.message) {
            showAlert(t_alert_name?.heading);
            setMessage(t_alert_name?.message)
            // setSourceName(t_alert_name);
        } else {
            // setSourceName({ id: "", source: "", updatedData: [] });
            showAlert(t_alert_name);
        }
    };

    useEffect(() => {
        emitter.addListener("alert", emitListener);
        return () => {
            emitter.removeAllListeners();
        };
    }, []);

    const showAnim = () => {
        Animated.timing(slideup, {
            toValue: Platform.OS == 'ios' ? 60 :  10,
            duration: 300,
            useNativeDriver: false,
        }).start();
        timeout_id = setTimeout(function () {
              hideAnim();
            autohidetime = 2000;
        }, autohidetime);
    };
    const hideAnim = () => {
        Animated.timing(slideup, {
            toValue: -200,
            duration: 300,
            useNativeDriver: false,
        }).start(({ finished }) => {
            setAlertName("");
        });
        clearTimeout(timeout_id);
    };

    const showAlert = (tname: string) => {
        setAlertName(tname);
        showAnim();
    };


    if (alert_name == "login") {
        return (

            <Animated.View style={[styles.container, { top: slideup, borderBottomColor: COLORS.green }, { shadowOpacity: 1, shadowColor: 'rgba(0,0,0,0.5)', shadowRadius: 10, shadowOffset: { width: 0, height: 5 }, elevation: 20 }]}>
                <LinearGradient
                    colors={['rgba(0, 237, 81, 0.12)', 'rgba(0, 237, 123, 0)', '#242C32']}
                    style={[styles.anim_cont]}
                    start={{ x: 0, y: 0 }} end={{ x: 0.4, y: 0 }}
                >
                    <TouchableOpacity

                        hitSlop={{ left: 5, right: 5, bottom: 5, top: 5 }}
                        style={{
                            backgroundColor: COLORS.dark, height: 37, width: 37,
                            borderRadius: 50, alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        <SuccessIcon />
                    </TouchableOpacity>
                    <View style={{ paddingHorizontal: 15 }}>
                        <AppText size={16} family='PoppinsBold' color={COLORS.white}>Success</AppText>
                        <View style={{ marginTop: -5 }} >
                            <AppText size={12} family='PoppinsMedium' color={'#C8C5C5'}>{message}</AppText>

                        </View>
                    </View>
                </LinearGradient>
            </Animated.View>
        );
    }
    if (alert_name == "failed") {
        return (
            <Animated.View style={[styles.container, { top: slideup, borderBottomColor: '#F04248' }, { shadowOpacity: 1, shadowColor: 'rgba(0,0,0,0.5)', shadowRadius: 10, shadowOffset: { width: 0, height: 5 }, elevation: 20 }]}>
                <LinearGradient
                    colors={['rgba(240, 66, 72, 0.13)', 'rgba(240, 66, 72, 0)', '#242C32']}
                    style={[styles.anim_cont]}
                    start={{ x: 0, y: 0 }} end={{ x: 0.8, y: 0 }}
                >
                    <TouchableOpacity

                        hitSlop={{ left: 5, right: 5, bottom: 5, top: 5 }}
                        style={{
                            backgroundColor: COLORS.dark, height: 37, width: 37,
                            borderRadius: 50, alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        <ErrorIcon />
                    </TouchableOpacity>
                    <View style={{ paddingHorizontal: 15 }}>
                        <AppText size={16} family='PoppinsBold' color={COLORS.white}>Failed</AppText>
                        <View style={{ marginTop: -5 }} >
                            <AppText size={12} family='PoppinsMedium' color={'#C8C5C5'}>{message}</AppText>

                        </View>
                    </View>
                </LinearGradient>
            </Animated.View>
        );
    }
    return <View></View>;
};
export default AlertPage;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: WIDTH / 1.1,
        // top: 0,
        backgroundColor: COLORS.success,
        marginHorizontal: ms(0),
        borderRadius: 10,
        borderBottomWidth: 3,

    },
    anim_cont: {
        paddingVertical: 8,
        borderRadius: 10,
        flexDirection: "row",
        paddingHorizontal: ms(0),
        alignItems: 'center'
    },
    alertHeading: {

    },
});
