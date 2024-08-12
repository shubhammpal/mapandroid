import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { CrossIcon } from '../../assets/svgImg/SvgImg'
import { styles } from './styles'
import AppText from '../AppText/AppText'
import { COLORS } from '../../style'
type AddReportprops = {
    setScreenData: any,
    data: any,
    setAddressHeight:any
}
const AddReport = ({ setScreenData, data,setAddressHeight }: AddReportprops) => {
    const [searchingText, setSearchingText] = useState<any>('')
    const onLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        
        setAddressHeight(height);
    };
    return (
        <View style={{ marginVertical: 25}} onLayout={onLayout}>
            <View style={styles.row}>
                <AppText size={20} color={COLORS.white} family='PoppinsSemiB' >Add a Report</AppText>
                <TouchableOpacity style={{}} onPress={() => setScreenData(4)}>
                    <CrossIcon />
                </TouchableOpacity>
            </View>
            <View style={styles.reportContainer}>
                {
                    data?.map((item: any) => {
                        return (
                            <TouchableOpacity onPress={() => {}} style={styles.report}>
                                {item.image}
                                <View style={styles.reportView}>
                                    <AppText size={15} color={COLORS.greyAD} family='PoppinsRegular' align='center'>{item?.title}</AppText>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <View style={{ justifyContent: 'flex-end',  }}>
                <AppText size={16} color={COLORS.white} family='PoppinsSemiB' >Any other report</AppText>
                <View style={[styles.row,{alignItems:'center',  marginTop:10}]}>
                    <View style={[styles.SearchBox]}>
                        <View style={styles.inputBox}>
                            <TextInput
                                value={searchingText}
                                style={styles.input}
                                placeholderTextColor={COLORS.grey92}
                                placeholder='Where to?'
                                onChangeText={(text) => setSearchingText(text)}
                                keyboardType='default'
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.startrideButton} onPress={() => setScreenData(3)}>
                        <AppText size={15} color={COLORS.white} family='PoppinsBold' >Add Point</AppText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default AddReport