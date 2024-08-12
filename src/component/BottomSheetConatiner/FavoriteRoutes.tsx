import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AppText from '../AppText/AppText'
import { COLORS, ms } from '../../style'
import { PlusIcon } from '../../assets/svgImg/SvgImg'
import { styles } from './styles'
type FavRoutesProps = {
    favRoutesData: any,
}
const FavoriteRoutes = ({ favRoutesData }: FavRoutesProps) => {
    return (
        <View style={styles.marginview}>
            <View style={styles.favConatiner}>
                <AppText size={15} color={COLORS.grey98} family='PoppinsRegular' >
                    Favorites Routes
                </AppText>
                <AppText size={15} color={COLORS.blueoff} family='PoppinsRegular' >
                    More
                </AppText>
            </View>
            <View style={styles.mainConatiner}>
                {
                    favRoutesData && (
                        <View style={styles.favroutesContainer}>
                            {
                                favRoutesData?.map((item: any, index: any) => {
                                    return (
                                        <TouchableOpacity
                                            key={item.id}
                                            style={{ paddingRight: 15 }}>
                                            <View style={styles.routeView} />
                                            <View style={styles.titleText}>
                                                <AppText
                                                    size={16}
                                                    color={COLORS.whiteEB}
                                                    family='PoppinsRegular'
                                                >
                                                    {item.title}
                                                </AppText>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                            <View>
                                <TouchableOpacity style={styles.addConatiner}>
                                    <PlusIcon />
                                </TouchableOpacity>
                                <View style={{ paddingTop: 10 }}>
                                    <AppText
                                        size={16}
                                        color={COLORS.whiteEB}
                                        family='PoppinsRegular'
                                        align='center'
                                    >
                                        Add
                                    </AppText>
                                </View>
                            </View>
                        </View>
                    )
                }
            </View>
        </View>
    )
}

export default FavoriteRoutes