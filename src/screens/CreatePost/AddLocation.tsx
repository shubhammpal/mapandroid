import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
  Platform,
} from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {MAP_KEY} from '../../services/api_helper';
import {COLORS, ms} from '../../style';
import AppText from '../../component/AppText/AppText';
import {fonts} from '../../utils/misc';
import {styles} from './styles';
import {ArrowBAckIcon} from '../../assets/svgImg/SvgImg';
import { AuthContext } from '../../component/auth/AuthContext';


const debounce = <T extends (...args: any[]) => void>(func: T, delay: number): T => {
  let timeoutId: NodeJS.Timeout;
  return ((...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as T;
};
const AddLocation = ({navigation,route}: any) => {
    const { setPostLocation}: any = useContext(AuthContext);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [latitudeT, setLatitudeT] = useState<any>();
  const [longituteT, setLongituteT] = useState<any>();

  useEffect(() => {
    getLocation();
   setSearchTerm(route.params.location)
  }, []);

  useEffect(() => {
    debouncedHandleSearch(searchTerm);
  }, [searchTerm]);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position: GeolocationResponse) => {
        const { latitude, longitude } = position.coords;
        fetchNearbyPlaces(latitude, longitude);
        setLatitudeT(latitude);
        setLongituteT(longitude);
        
      },
      error => {
        handleLocationError(error.code);
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
    );
  };

  const handleLocationError = (errorCode: number) => {
    let errorMessage = 'Unknown error occurred.';

    switch (errorCode) {
      case 1:
        errorMessage = 'Location permission denied.';
        break;
      case 2:
        errorMessage = 'Location unavailable.';
        break;
      case 3:
        errorMessage = 'Location request timed out.';
        break;
      case 4:
        errorMessage = 'Unknown activity error.';
        break;
      default:
        break;
    }

    console.error(`Location Error: ${errorMessage}`);
  };

  const fetchNearbyPlaces = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&type=point_of_interest&key=${MAP_KEY}`
      );
      const data = await response.json();
      const places = data.results.slice(0, 15);
      setNearbyPlaces(places);
      
    } catch (error) {
      console.error('Error fetching nearby places:', error);
    }
  };



  const handleSearch = async (text: string) => {
    setSearchTerm(text);
    if (text.trim().length === 0) {
      if (latitudeT && longituteT) {
        fetchNearbyPlaces(parseFloat(latitudeT), parseFloat(longituteT));
      }
      return;
    }
    try {
        const testQuery = text;
        const testLatitude = latitudeT; 
        const testLongitude = longituteT;
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(testQuery)}&location=${testLatitude},${testLongitude}&radius=1000000&key=${MAP_KEY}`;
        
        const response = await fetch(url);
        const data = await response.json();
        const places = data.results.slice(0, 15);
        setNearbyPlaces(places);
        
    } catch (error) {
        console.error('Error fetching test places:', error);
    }
};



  // Create a debounced version of handleSearch
  const debouncedHandleSearch = useCallback(debounce(handleSearch, 300), [latitudeT, longituteT]);


  const renderPlaceItem = ({item}:{item:any}) => (
    <TouchableOpacity 
    onPress={()=>{setPostLocation(item.name),navigation.goBack()}}
      style={{
        marginTop: 12,
        borderWidth: 1,
        borderColor: COLORS.semigrey,
        borderRadius: 6,
        paddingLeft: 6,
        justifyContent: 'center',
        width: '90%',
        alignSelf: 'center',
        paddingVertical:6
      }}>
      <AppText
        color={COLORS.white}
        size={16}
        family={'PoppinsMedium'}
        horizontal={12}>
        {item.name}
      </AppText>
      <AppText
        color={COLORS.greyB0B0}
        size={12}
        family={'PoppinsMedium'}
        horizontal={12}>
        {item.vicinity ||item.formatted_address}
      </AppText>
      
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, backgroundColor: COLORS.black}}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: Platform.OS=='android'?25:ms(7)}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              paddingLeft: 16,
              height: 40,
              width: 40,
              justifyContent: 'center',
            }}>
            <ArrowBAckIcon />
          </TouchableOpacity>
          <AppText
            size={20}
            color={COLORS.whiteFBFB}
            family={fonts.QuicksandBold}
            horizontal={15}
            width={'78%'}>
            {'Select a location'}
          </AppText>
      </View>
      <View style={[styles.SearchBox]}>
        <View style={styles.inputBox}>
          <TextInput
            style={{
              width: '100%',
              color: COLORS.white,
              fontFamily: fonts.PoppinsMedium,
              fontSize: 15,
              height: 51,
            }}
            placeholder="Search places"
            placeholderTextColor={COLORS.grey999}
            value={searchTerm}
            onChangeText={handleSearch}
          />
        </View>
      </View>
      <FlatList
        data={nearbyPlaces}
        keyExtractor={item => item.place_id.toString()}
        renderItem={renderPlaceItem}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}
      />
    </View>
  );
};

export default AddLocation;
