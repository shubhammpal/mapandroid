
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, ms } from '../../../style';
import { AddIcon, VideoIcon } from '../../../assets/svgImg/SvgImg';
import { styles } from './styles';
import ImagePicker from 'react-native-image-crop-picker';
import { width } from '../../../style/typography';
import { AuthContext } from '../../../component/auth/AuthContext';
import { requestAddEventImages } from '../../../services/api_Services';
import { useFocusEffect } from '@react-navigation/native';
import AppText from '../../../component/AppText/AppText';


const Myactivities = ({ data, navigation, profile }: any) => {
  const { userToken, userDetails }: any = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState<any>();
  const [loader, setloader] = useState<boolean>(false);
  const [thumbnails, setThumbnails] = useState<{ [key: string]: string }>({});



  const takePhotoFromLibray = () => {
    setTimeout(() => {
      ImagePicker.openPicker({
        cropping: false,
        height: 300,
        width: width,
        multiple: true,
        mediaType: 'photo'
      }).then(image => {
        image?.map((item) => {
          setSelectedImage(item?.path);
          setTimeout(() => {
            AddEventImages(item?.path)
          }, 2000);
        })
      });
    }, 500);
  };



  const AddEventImages = async (images: any) => {
    setloader(true)
    const apidata: any = {
      id: data?._id,
      token: userToken,
      files: images,
    };
    try {
      await requestAddEventImages(apidata).then(async (res: any) => {
        navigation.goBack()
        setloader(false)
      });
    } catch (error) {
      setloader(false)
      console.log('Profile Image response: ', error);
    }

  };


  return (
    <View style={styles.container2}>
      {!profile && (
        <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: "row" }}>
          <AppText
            size={22}
            color={COLORS.white}
            family="PoppinsSemiB">{`${profile ? data?.files?.length : data?.files?.length} Photos`}</AppText>
          
        </View>
      )}
      <View style={{ flexDirection: "row", flexWrap: 'wrap', paddingBottom: ms(2), width: "100%",  alignItems: 'center' }}>

        {
          profile ? (
            <View style={{ flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            width: '100%',
             alignSelf: 'center',gap: 8}}>
           { data?.posts?.map((item:any, i:any) => (
              item?.files?.map((itm:any, index:any) => {
                
                
                return (
                  <TouchableOpacity style={{ width: '31%', alignSelf: 'center', overflow: "hidden", }} onPress={() => navigation.navigate('PostDetails', { postId: item?._id })}>
                    <Animatable.View
                      key={item?.type}
                      animation="fadeIn"
                      delay={i * 50}
                      useNativeDriver
                      style={{ width: "100%" }}
                    >
                      {itm?.type == "photo" ?
                        <Animatable.Image
                          source={{ uri: itm?.url }}
                          style={[styles.item, { width: "100%" }]}
                          resizeMode='cover'
                        />
                        :
                        <View style={[styles.item, { width: "100%" ,backgroundColor:'black'}]} >
                            <View style={{ position: 'absolute', right: 8, top: 15 }}>
                            <VideoIcon />
                          </View>
                          </View>
                      }
                     
                    </Animatable.View>
                  </TouchableOpacity>
                )
              })
            ))
}
            </View>
          ) : (
            data?.files?.map((item, i) => (
              <Animatable.View
                key={item?.type}
                animation="fadeIn"
                delay={i * 50}
                useNativeDriver
              >
                <Animatable.Image
                  source={{ uri: item?.url }}
                  style={styles.item}
                />
                {
                  item?.id == 4 || item?.id == 5 ? (
                    <View style={{ position: 'absolute', right: 8, top: 15 }}>
                      <VideoIcon />
                    </View>
                  ) : null
                }
              </Animatable.View>
            ))
          )
        }


      </View>
    </View>
  );
}
export default Myactivities

