import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { COLORS } from '../../../style';
import { CrossBorderIcon, SearchIcon, SmallLocationIcon } from '../../../assets/svgImg/SvgImg';
import { fonts } from '../../../utils/misc';
import { MAP_KEY } from '../../../services/api_helper';

const CreateSearchtextinput = ({ setSearchText, searchText, ref, data, placeholder, getDirections, locationStatus, getDirections1, setStartLocation, setDestinationLocation }: any) => {
    const [isFocused, setIsFocused] = useState(false);
    const googlePlacesRef = useRef(null);
    useEffect(() => {
        if (data) {
            null
        } else {
            if (googlePlacesRef?.current) {
                googlePlacesRef?.current?.setAddressText(searchText);
            }
        }
    }, [searchText]);
    return (
        <View style={{
            backgroundColor: '#212121',
            borderWidth: 1,
            borderRadius: 30,
            marginVertical: 20,
            borderColor: COLORS.offblack43,
        }}>
            <GooglePlacesAutocomplete
                placeholder={placeholder}
                ref={data ? ref : googlePlacesRef}
                fetchDetails={true}
                onPress={(data, details = null) => {
                    
                    if (details && details.geometry && details.geometry.location) {
                        const { lat, lng } = details.geometry.location;
                        if (locationStatus == 1) {
                            setStartLocation({
                                latitude: lat,
                                longitude: lng,
                            });

                            getDirections(details.formatted_address)
                        } else {
                            setDestinationLocation({
                                latitude: lat,
                                longitude: lng,
                            });
                            getDirections1(details.formatted_address)
                        }


                    } else {
                        console.warn('No location details available');
                    }
                }}
                styles={{
                    textInputContainer: {
                        width: '100%',
                        backgroundColor: COLORS.black21,
                        borderRadius: 50,
                        borderWidth: 1,
                        // marginTop: 8,
                        borderColor: COLORS.semigrey,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 15,
                    },
                    textInput: {
                        flex: 1,
                        backgroundColor: 'transparent',
                        paddingHorizontal: 10,
                        color: COLORS.white,
                        fontFamily: fonts.PoppinsMedium,
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
                    // value:searchText,
                    onChangeText: (text) => {
                        setSearchText(text)
                    },
                    onFocus: () => {
                        setIsFocused(true);
                    },
                    clearButtonMode: 'never',
                }}

                debounce={1000}
                query={{
                    key: MAP_KEY,
                    language: 'en',
                    type: ['establishment', 'street_address'],
                    // location: `${destination?.latitude}, ${destination?.longitude}`,
                    radius: 10
                }}
                GooglePlacesSearchQuery={{
                    language: 'en',
                    rankby: 'distance',
                    type: 'restaurant',
                    // location: `${destination?.latitude}, ${destination?.longitude}`,
                    radius: 10
                }}
                renderRow={(rowData) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <SmallLocationIcon style={{ marginRight: 15 }} />
                        <Text style={{
                            color: COLORS.grey54,
                            fontFamily: fonts.PoppinsRegular,
                            fontSize: 15,
                        }}>{rowData.description}</Text>
                    </View>
                )}

                renderLeftButton={() => (
                    <SearchIcon />
                )}

                renderRightButton={() => (
                    isFocused == true ? (
                        <TouchableOpacity
                            onPress={() => {
                                
                                setSearchText('')
                                if (data) {
                                    if (ref?.current) {
                                        
                                        googlePlacesRef?.current?.setAddressText('');
                                        ref?.current?.setAddressText('');
                                    }
                                } else {
                                    if (googlePlacesRef?.current) {
                                        
                                        googlePlacesRef?.current?.setAddressText('');
                                    }
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

export default CreateSearchtextinput

