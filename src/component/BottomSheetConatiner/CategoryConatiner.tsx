import React, { useCallback, useMemo, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import BottomSheet, { BottomSheetScrollView, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { styles } from "./styles";
import AppText from "../AppText/AppText";
import { COLORS } from "../../style";
type CategoryProps = {
  data: any,
  handleFocus:any,
  setScreenData:any,
  setCategoryDataList:any
}
const CategoryConatiner = ({data,handleFocus,setCategoryDataList}:CategoryProps) => {
  const [isSelected, setIsSelected] = useState<any>();
  const renderItem = useCallback(
    (item:any) => (
      <TouchableOpacity
        key={item.id}
        style={[styles.categoryContainer, { backgroundColor: isSelected === item.id ? COLORS.white : COLORS.white2D }]}
        onPress={() => {
          handleFocus();
          setIsSelected(item.id);
          setCategoryDataList(item)
        }}
      >
        {item.image}
        <View style={styles.titleText}>
          <AppText
            size={14}
            color={isSelected === item.id ? COLORS.blue : COLORS.grey737}
            family='PoppinsMedium'
          >
            {item.title}
          </AppText>
        </View>
      </TouchableOpacity>
    ),
    [isSelected, handleFocus, setIsSelected]
  );

  return (
      <ScrollView style={{marginVertical:15}} horizontal showsHorizontalScrollIndicator={false}>
        {data.map(renderItem)}
      </ScrollView>
  );
};



export default CategoryConatiner;