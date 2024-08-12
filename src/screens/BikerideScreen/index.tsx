import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import AppText from '../../component/AppText/AppText';
import { COLORS } from '../../style';
import { styles } from './styles';
import { AuthContext } from '../../component/auth/AuthContext';
import FastImage from 'react-native-fast-image';
import SubmitButton from '../../component/ButtonCotainer/SubmitButton';
import {
  requestgetmybikeList,
  requestnewbikedelete,
} from '../../services/api_Services'; // assuming requestDeleteBikeAssociation is imported
import { strings } from '../../utils/strings';
import { useFocusEffect } from '@react-navigation/native';
import {
  ArrowBAckIcon,
  CrossRedIcon,
  EditIcon,
  DeleteIcon,
} from '../../assets/svgImg/SvgImg';
import emitter from '../../component/Emitter/emitter';

const BikerideScreen = ({ navigation }: any) => {
  const { userDetails, userToken }: any = useContext(AuthContext);
  const [bikeModallist, setBikeModallist] = useState<any>();
  const [editBrandIndex, setEditBrandIndex] = useState<number | null>(null);
  const [expandedBrandIndex, setExpandedBrandIndex] = useState<number | null>(
    null,
  );

  useFocusEffect(
    useCallback(() => {
      getMyBikeList();
    }, []),
  );

  const getMyBikeList = async () => {
    const apiData = { user_id: userDetails?.id, token: userToken };
    try {
      const res = await requestgetmybikeList(apiData);
      if (res?.status === true) {
        setBikeModallist(res?.data);
        
      }
    } catch (error) {
      console.log('Error fetching bike list:', error);
    }
  };

  const handleEditBrandClick = (index: number) => {
    setEditBrandIndex(index === editBrandIndex ? null : index);
    setExpandedBrandIndex(null); // Reset expanded brand when editing a different brand
  };

  const handleDeleteAssociation = async (
    brandId: number,
    modelId: number,
    userId: number,
  ) => {
    const requestData = { brand_id: brandId, model_id: modelId, user_id: userId };
    
    try {
      const res = await requestnewbikedelete(requestData, userToken);
      
      getMyBikeList();
      const alertData = { heading: 'Login', message: res?.message };
      emitter.emit('alert', alertData);
    } catch (error) {
      console.log('Complete Profile Error:', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <SafeAreaView />
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View style={styles.container}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ paddingVertical: 15, paddingRight: 15 }}>
              <ArrowBAckIcon active={COLORS.white} />
            </TouchableOpacity>
            <AppText
              size={20}
              color={COLORS.white}
              family="PoppinsSemiB"
              horizontal={10}>
              My Bikes
            </AppText>
          </View>

          {bikeModallist && (
            <>
              {bikeModallist?.map((bike: any, bikeIndex: number) => (
                <View key={bike?.id} style={styles.mainContainer}>
                  <View style={styles.mainWrapper}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={styles.imageVuiew}>
                        <FastImage
                          source={
                            bike?.brand_logo
                              ? { uri: bike?.brand_logo }
                              : require('../../assets/img/bikeimage.png')
                          }
                          resizeMode={FastImage.resizeMode.contain}
                          style={styles.item}
                        />
                      </View>
                      <AppText
                        size={20}
                        color={COLORS.white}
                        family="PoppinsMedium"
                        numLines={2}>
                        {bike?.brand_name}
                      </AppText>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleEditBrandClick(bikeIndex)}
                      style={{ marginRight: 10, height: 20 }}>
                      <EditIcon />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.titleView}>
                    {bike?.models && (
                      <>
                        {bike?.models
                          .slice(
                            0,
                            expandedBrandIndex === bikeIndex ? undefined : 2,
                          )
                          .map((model: any, index: number) => (
                            <View
                              key={model.id}
                              style={{ flexDirection: 'row', width: '100%',
                              alignItems:'center'}}>
                              <View style={styles.contentWrapper}>
                                <AppText
                                  size={14}
                                  color={COLORS.greyD9}
                                  family="PoppinsMedium">
                                  {`${index + 1}. `}
                                </AppText>
                                <View style={{ width: '96%' }}>
                                  <AppText
                                    size={14}
                                    horizontal={6}
                                    color={COLORS.greyD9}
                                    family="PoppinsMedium">
                                    {model?.model_name}
                                  </AppText>
                                  <AppText
                                    size={11}
                                    horizontal={6}
                                    color={COLORS.greyB0B0}
                                    family="PoppinsMedium">
                                    {model?.registration_no}
                                  </AppText>
                                </View>

                              </View>
                              {editBrandIndex === bikeIndex && (
                                <TouchableOpacity
                                  onPress={() =>
                                    handleDeleteAssociation(
                                      bike?.brand_id,
                                      model?.model_id,
                                      userDetails?.id,
                                    )
                                  }
                                  style={{ paddingHorizontal: '3%', marginLeft: '7%' }}>
                                  <DeleteIcon />
                                </TouchableOpacity>
                              )}
                            </View>
                          ))}
                        {bike?.models.length > 2 && (
                          <TouchableOpacity
                            onPress={() =>
                              setExpandedBrandIndex(
                                expandedBrandIndex === bikeIndex
                                  ? null
                                  : bikeIndex,
                              )
                            }
                            style={{ marginTop: 5 }}>
                            <AppText size={14} color={COLORS.lightyellow}>
                              {expandedBrandIndex === bikeIndex
                                ? 'Hide'
                                : 'Read More'}
                            </AppText>
                          </TouchableOpacity>
                        )}
                      </>
                    )}
                  </View>
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>
      <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
        <SubmitButton
          title={'Add New Bike'}
          pressing={() => {
            navigation.navigate('BikeModalUpdate', {
              screen: 'mybike',
            });
          }}
          widthOf={'98%'}
        />
      </View>
    </View>
  );
};

export default BikerideScreen;
