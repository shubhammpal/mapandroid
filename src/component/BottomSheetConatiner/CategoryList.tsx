import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import BottomSheet, { BottomSheetScrollView, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { styles } from "./styles";
import AppText from "../AppText/AppText";
import { COLORS } from "../../style";
import { GarageIcon, HospitalIcon, RestaurantIcon } from "../../assets/svgImg/SvgImg";
import { requestMapApi } from "../../services/auth_helper";
const geolib = require('geolib');

type CategoryProps = {
    setScreenData: any,
    categoryDataList: any,
    latitude: any,
    longitude: any
    setCurrentLocation: any
    getDirections: any
    setCategoryDataList: any
    setSearchText: any
    setEndAddress: any
}
const CategoryList = ({ setScreenData, categoryDataList, latitude, longitude, setCurrentLocation, getDirections, setCategoryDataList, setSearchText, setEndAddress }: CategoryProps) => {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        getCategoryData();
    }, []);
    const handleApiCall = async (latitude: any, longitude: any, address: any, mapApiResponse: any) => {
        try {
            const response = await fetch('http://3.111.234.55:6002/api/map/map-responce', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    latitude,
                    longitude,
                    address,
                    mapApiResponse,
                }),
            });

            const data = await response.json();
            console.log('API Response:', data);
        } catch (error) {
            console.error('Error calling API:', error);
        }
    };
    const getCategoryData = async () => {
        const apiId = { keyword: categoryDataList?.title, radius: 1000, type: categoryDataList?.title, lat: latitude, long: longitude };
        try {
            const res = await requestMapApi(apiId);
            setData(res?.results || []);
        } catch (error) {
            console.log('MAP  Response >>>>  ', error);
        }
    };

    const renderItem = useCallback(
        (item: any) => (
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, flex: 1 }} onPress={() => {
                setEndAddress(item?.name)
                setScreenData(1)
                setCurrentLocation([item?.geometry?.location?.lng, item?.geometry?.location?.lat]);
                getDirections([item?.geometry?.location?.lng, item?.geometry?.location?.lat],item?.name)
                setCategoryDataList('');
                setSearchText('');
                handleApiCall(item?.geometry?.location?.lat,item?.geometry?.location?.lng, item?.formatted_address, JSON.stringify(item))
            }}>
                {categoryDataList?.id == 1 ? <HospitalIcon /> : categoryDataList?.id == 2 ? <RestaurantIcon /> : <GarageIcon />}
                <View style={{ marginHorizontal: 25, flex: 1 }}>
                    <AppText size={20} color={COLORS.white} family='PoppinsBold' numLines={1}>{item?.name}</AppText>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <AppText size={12} color={COLORS.greyAD} family='PoppinsRegular' numLines={2} width={'90%'}>{item?.vicinity}</AppText>


                    </View>
                </View>
                <AppText size={12} color={COLORS.greyAD} family='PoppinsRegular' >
                    {
                        item?.distance <= 1000 ? `${item?.distance}m` : `${(item?.distance / 1000).toFixed(2)}km`
                    }

                </AppText>
            </TouchableOpacity>
        ),
        [categoryDataList]
    );

    const myLocation = { latitude, longitude };
    const hospitalsWithDistance = data.map((hospital: any ) => {
        const hospitalLocation = hospital.geometry.location;
        const distance = geolib.getDistance(myLocation, hospitalLocation);
        console.log(myLocation, hospitalLocation)
        return { ...hospital, distance };
    });

    hospitalsWithDistance.sort((a: any, b: any) => a.distance - b.distance);

    return (
        <>
            {hospitalsWithDistance.map(renderItem)}
        </>
    );
};


export default CategoryList;
