import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppText from '../AppText/AppText'
import { COLORS, ms } from '../../style'
import { SearchboxIcon } from '../../assets/svgImg/SvgImg'
import { styles } from './styles'
import axios from 'axios'
import { AuthContext } from '../auth/AuthContext'
type RecentSearchProps = {
  recentData: any,
  pressing: any,
  handleFocus: any,
}
const RecentSearch = ({ recentData, pressing, handleFocus }: RecentSearchProps) => {
  const [recentDataP, setRecentDataP] = useState<any[]>();
  const { userToken,userDetails }: any = useContext(AuthContext);

  useEffect(() => {
    const fetchRecentSearches = async () => {
      try {
        const response = await fetch(`http://3.111.234.55:6002/api/map/map-responce-list?userId=${userDetails?.id}`);
        
        const data = await response.json();
  
        setRecentDataP(data?.payload); // Adjust this according to the actual structure of the response
      } catch (error) {
        console.error('Error fetching recent searches:', error);
      }
    };

    fetchRecentSearches();
  }, []);

  return (
    <View style={styles.recentView}>
      {
        recentDataP && (
          <AppText size={15} color={COLORS.grey98} family='PoppinsRegular' >
            Recent Search
          </AppText>
        )
      }
      <View style={styles.recentSearch}>
        {
          recentDataP?.map((item: any, index: any) => {
            if(index > 2){
              return
            }
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.searchContainer, { backgroundColor: COLORS.black141 }]}
                onPress={() => {
                  handleFocus()
                  setTimeout(() => {
                    pressing(item?.mapApiResponse)
                  }, 500);
                }}
              >
                <SearchboxIcon />
                <View style={styles.titleText}>
                  <AppText
                    size={16}
                    color={COLORS.greyDC}
                    family='PoppinsRegular'
                    numLines={1}
                    dotMode='tail'
                  >
                    {item?.address}
                  </AppText>
                  <AppText
                    size={14}
                    color={COLORS.grey86}
                    family='PoppinsMedium'
                  >
                    {item?.mapApiResponse?.name}
                  </AppText>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </View>
    </View>
  )
}

export default RecentSearch