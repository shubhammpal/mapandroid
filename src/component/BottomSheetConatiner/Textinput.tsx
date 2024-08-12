import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { CrossBorderIcon, SearchIcon, SmallLocationIcon } from '../../assets/svgImg/SvgImg';
import { MAP_KEY } from '../../services/api_helper';
import { COLORS } from '../../style';
import { fonts } from '../../utils/misc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { red } from '../../style/Colors';
import { AuthContext } from '../auth/AuthContext';
import emitter from '../Emitter/emitter';
import { requestPlacesDatapost } from '../../services/api_Services';

const Textinput = ({ setScreenData, setCurrentLocation, getDirections, setSearchText, destination, searchText, handleFocus, ref, setCategoryDataList, categoryDataList, setEndAddress }: any) => {
    const [search, setSearch] = useState('')
    const ref_inPut = useRef<any>();
    const [isFocused, setIsFocused] = useState(false);
    const { userToken,userDetails }: any = useContext(AuthContext);

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
                    userId:userDetails?.id
                }),
            });

            const data = await response.json();
            console.log('API Response:', data);
        } catch (error) {
            console.error('Error calling API:', error);
        }
    };

    const placesPostData=async (placesArr: any[])=>{
        // setEndAddress(placesArr)
        try {
            await requestPlacesDatapost(placesArr)
              .then(async (res: any) => {
              
              })
          } catch (error) {
            console.log("Places api response  response: ", error);
          }
    }
    return (
        <View>
            <GooglePlacesAutocomplete
                placeholder='Search'
                ref={ref_inPut}
                fetchDetails={true}
                onPress={(data, details = null) => {
                    setEndAddress(data?.description)
                    if (details && details.geometry && details.geometry.location) {
                        const { lat, lng } = details.geometry.location;
                        setScreenData(1)
                        setSearch('')
                        setCurrentLocation([lng, lat]);
                        getDirections([lng, lat],details.formatted_address)
                        handleApiCall(lat,lng, details.formatted_address, JSON.stringify(details))

                    } else {
                        console.warn('No location details available');
                    }
                }}
                styles={{
                    textInputContainer: {
                        width: '100%',
                        backgroundColor: COLORS.black21,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: COLORS.semigrey,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 15,
                    },
                    textInput: {
                        flex: 1,
                        backgroundColor: 'transparent',
                        paddingHorizontal: 10,
                        color: COLORS.grey92,
                        fontFamily: fonts.PoppinsLight,
                        fontSize: 15,
                    },
                    poweredContainer: {
                        display: 'none',
                    },
                    description: {
                        fontWeight: 'bold',
                        color: COLORS.grey54,
                        fontFamily: fonts.PoppinsRegular,
                        fontSize: 15,
                    },
                    row: {
                        backgroundColor: COLORS.black21,
                        paddingHorizontal: 20,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        marginBottom: -10
                    },
                    separator: {
                        backgroundColor: 'rgba(33, 33, 33, 1)'
                    },
                    listView: {
                        marginVertical: 10,
                        marginBottom: 25
                    }
                }}
                minLength={3}
                listLoaderComponent={() => (
                    <View style={{ padding: 10 }}>
                        <ActivityIndicator size='large' color={COLORS.white} />
                    </View>
                )}
                textInputProps={{
                    placeholderTextColor: COLORS.grey92,
                    fontFamily: fonts.PoppinsLight,
                    fontSize: 15,
                    top: 5,
                    value: categoryDataList?.title,
                    clearButtonMode: 'never',
                    onFocus: () => {
                        setIsFocused(true);
                        handleFocus();
                    },
                    onBlur: () => {
                        setIsFocused(false);
                    },
                }}

                query={{
                    key: MAP_KEY,
                    language: 'en',
                    type: ['establishment', 'street_address'], // language of the results,
                    location: `${destination?.latitude}, ${destination?.longitude}`,
                    radius: 10,
                    components: 'country:in',
                }}
                debounce={1000}
                GooglePlacesSearchQuery={{
                    language: 'en',
                    rankby: 'distance',
                    type: 'restaurant',
                    location: `${destination?.latitude}, ${destination?.longitude}`,
                    radius: 10
                }}
                renderRow={(rowData, data) => {
                    const placesArr: any[] = []
                    placesArr.push({
                        name: rowData?.description,
                        placeId: rowData?.place_id,
                        main_text: rowData?.structured_formatting?.main_text,
                        secondary_text: rowData?.structured_formatting?.secondary_text
                    })

                    
                    placesPostData(placesArr)
                    return (
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <SmallLocationIcon style={{ marginRight: 15 }} />
                            <Text style={{
                                color: COLORS.grey54,
                                fontFamily: fonts.PoppinsRegular,
                                fontSize: 15,
                            }}>{rowData.description}</Text>
                        </View>
                    )
                }}

                renderLeftButton={() => (
                    <SearchIcon />
                )}

                renderRightButton={() => (
                    isFocused == true || categoryDataList ? (
                        <TouchableOpacity
                            onPress={() => {
                                if (categoryDataList) {
                                    setCategoryDataList('');
                                } else {
                                    setSearch('');
                                    ref_inPut.current.clear();

                                }
                            }}

                        >
                            <CrossBorderIcon />
                        </TouchableOpacity>
                    ) : <></>
                )}
            />
        </View>
    )
}

export default Textinput
