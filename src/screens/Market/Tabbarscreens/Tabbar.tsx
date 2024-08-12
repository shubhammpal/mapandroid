// MarketTabbar.js

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Animated,
} from 'react-native';
import { COLORS } from '../../../style';
import AppText from '../../../component/AppText/AppText';

const MarketTabbar = ({ scrollY, setSelectedTab, categories }: any) => {
  const _spacing = 10;
  const ref = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const [viewPosition, setViewPosition] = useState(0.5);

  useEffect(() => {
    if (categories.length > 0) {
      ref.current?.scrollToIndex({
        index,
        animated: true,
        viewOffset: _spacing,
        viewPosition: 0.5,
      });
      setSelectedTab(index); // Update selected tab when index changes
    }
  }, [index, viewPosition, categories]);

  const HEADER_HEIGHT = 70;
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
  const headerY = diffClampScrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });
  const _colors = {
    active: COLORS.blue,
    inactive: COLORS.white,
  };

  return (
    <>
      <Animated.View
        style={{ height: HEADER_HEIGHT, transform: [{ translateY: headerY }] }}>
        <View style={styles.headerContainer}>
          <SafeAreaView />
          <FlatList
            ref={ref}
            style={{ flexGrow: 0, marginTop: 10, marginBottom: 10 }}
            data={categories}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingLeft: _spacing }}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item, index: fIndex }) => (
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => setIndex(fIndex)}>
                <View
                  style={{
                    marginRight: _spacing,
                    paddingVertical: 5,
                    height: 35,
                    paddingHorizontal: 15,
                    borderRadius: 50,
                    backgroundColor:
                      fIndex == index ? _colors.active : _colors.inactive,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <AppText
                    color={fIndex == index ? COLORS.white : COLORS.black}
                    size={14}
                    family={'PoppinsRegular'}>
                    {item.category_name}
                  </AppText>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 10,
  },
});

export default MarketTabbar;