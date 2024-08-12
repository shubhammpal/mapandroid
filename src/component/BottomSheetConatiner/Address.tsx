import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles'
import AppText from '../AppText/AppText'
import { COLORS } from '../../style'
import SubmitButton from '../ButtonCotainer/SubmitButton'
import { CrossIcon } from '../../assets/svgImg/SvgImg'
type AddressProps = {
    address: any,
    distance: any,
    setScreenData: any
    setAddressHeight: any
    routeNotAvailable: any
    setrouteNotAvailable: any
    RouteSet: any
}
const Address = ({ address, distance, setScreenData, setAddressHeight, routeNotAvailable, setrouteNotAvailable, RouteSet }: AddressProps) => {
    const onLayout = (event: { nativeEvent: { layout: { height: any } } }) => {
        const { height } = event.nativeEvent.layout;

        setAddressHeight(height);
    };
    return (
        <View style={[styles.addressContaier]} onLayout={onLayout}>
            <TouchableOpacity style={styles.distanceView} onPress={() => {setScreenData(0), setrouteNotAvailable(false)}}>
                <CrossIcon />
            </TouchableOpacity>
            <AppText size={22} color={COLORS.white} family='PoppinsBold' align='center' numLines={1}>{routeNotAvailable ? address : "Calculating"}</AppText>
            <View style={{ marginTop: 5 }}>
                <AppText size={12} color={COLORS.grey86} family='PoppinsRegular' align='center'>{routeNotAvailable ? address : "Calculating"}</AppText>
            </View>
            <View style={styles.addressContaier}>

                <AppText
                    size={35}
                    color={COLORS.white}
                    family='PoppinsSemiB'
                    align='center'
                >{routeNotAvailable ? `${distance}km` : distance != 0 && "Calculating"}</AppText>
            </View>
            <View style={{ marginVertical: 10 }}>
                <SubmitButton title={routeNotAvailable ? 'Add to route' : "Back"} pressing={() => {
                    if (routeNotAvailable) {
                        RouteSet()
                    } else {
                        setScreenData(0)
                    }
                }} widthOf={'100%'} />
            </View>
        </View>

    )
}

export default Address