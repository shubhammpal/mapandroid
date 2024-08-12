import { View, Text } from 'react-native'
import React from 'react'
import { StraightHeadIcon, TurnLeftIcon, TurnRIghtIcon, UTurnRIghtICon, UturnLeftIcon } from '../../assets/svgImg/SvgImg'

const DirectionIcon = (point: any) => {
  let direction = point?.direction
  
  if(direction == 'uturn-right'){
    return <UTurnRIghtICon />
  } else if(direction == 'uturn-left'){
    return <UturnLeftIcon />
  } else if(direction == 'turn-left'){
    return <TurnLeftIcon />
  } else if(direction == 'turn-right'){
    return <TurnRIghtIcon />
  } else{
    return <StraightHeadIcon />
  }
}

export default DirectionIcon