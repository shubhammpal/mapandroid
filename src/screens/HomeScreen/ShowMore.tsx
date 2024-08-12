import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import AppText from '../../component/AppText/AppText'
import { COLORS } from '../../style'
import { LinkPreview } from '@flyerhq/react-native-link-preview'
import { shadowStyle } from '../../style/typography'
// import { getLinkPreview, getPreviewFromContent } from "link-preview-js";

const ShowMore = ({ description }: any) => {
  const [showMore, setShowMore] = useState(false);
  const [urlView, setUrlView] = useState(false);

  const text = description;

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = text?.match(urlRegex);
  
  if (urls) {

  } else {
    // console.log("No URLs found in the text.");
  }

  

  const handlePreviewDataFetched = (previewData: any) => {
    console.log('Preview data fetched:', previewData);
  };

  return (
    <View style={styles.postDesc}>
      <AppText size={14} numLines={showMore ? 0 : 3} dotMode='tail' family="PoppinsRegular" color={COLORS.whiteEB}>
        {description}
        
      </AppText>
      {description.length > 70 ? (
        <TouchableOpacity onPress={() => {
          setShowMore(!showMore)
        }}>

          <AppText
            size={14}
            family="PoppinsRegular"
            color={COLORS.lightyellow}>
            {showMore ? "Read less" : "Read more"}
          </AppText>
        </TouchableOpacity>)
        : (
          null
        )
      }
      


    </View>
  )
}

export default ShowMore


