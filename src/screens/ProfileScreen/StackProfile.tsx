
import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import Myactivities from '../Tabbarscreens/Myactivities/Myactivities';
import Group from '../Tabbarscreens/Group/Group';
import AppText from '../../component/AppText/AppText';
import {
  CommunitysIcon,
  GroupsIcon,
  MyactivitiesIcon,
} from '../../assets/svgImg/SvgImg';
import { COLORS } from '../../style';
import ClubScreen from '../Tabbarscreens/Club/Club';
import EventsScreen from '../Tabbarscreens/Events/EventsScreen';
import MembersScreen from '../Tabbarscreens/Members/Members';
import EventDetails from '../Tabbarscreens/Events/EventDetails';

const { width } = Dimensions.get('screen');

export default function ScrollableTabViewReanimated({
  navigation,
  headers,
  icon,
  id,
  clubId,
  data,
}: any) {
  const getHeaderWidths = () => {
    const obj = {};
    headers.forEach((x, i) => {
      obj[i] = useSharedValue(0);
    });
    return obj;
  };
  const headerWidths = getHeaderWidths();
  const [addressHeight, setAddressHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0); // Add state for active index
  const [viewHeight, setViewHeight] = useState(0)
  const scrollY = useSharedValue(0);
  const topScrollY = useSharedValue(0);

  const bottomScrollRef = useAnimatedRef();
  const scroll1 = useSharedValue(0);
  useDerivedValue(() => {
    scrollTo(bottomScrollRef, scroll1.value * width, 0, true);
  });

  const topScrollRef = useAnimatedRef();
  const scroll2 = useSharedValue(0);
  useDerivedValue(() => {
    scrollTo(topScrollRef, scroll2.value, 0, true);
  });

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.x;
  });

  const topScrollHandler = useAnimatedScrollHandler(event => {
    topScrollY.value = event.contentOffset.x;
  });

  const barWidthStyle = useAnimatedStyle(() => {
    const input = [];
    const output1 = [];
    const output2 = [];
    let sumWidth = 0;
    const keys = Object.keys(headerWidths);
    keys.map((key, index) => {
      input.push(width * index);
      const cellWidth = headerWidths[key].value;
      output1.push(cellWidth);
      output2.push(sumWidth);
      sumWidth += cellWidth;
    });
    const moveValue = interpolate(scrollY.value, input, output2);
    const barWidth = interpolate(scrollY.value, input, output1);
    // next line handle auto scroll of top ScrollView
    scroll2.value = moveValue + barWidth / 2 - width / 2;
    // Adjust the barWidth to be smaller
    const smallerBarWidth = barWidth * 0.8; // Adjust the scale factor as needed

    return {
      width: smallerBarWidth,
      transform: [
        {
          translateX: moveValue + (barWidth - smallerBarWidth) / 2,
        },
      ],
    };
  });

  const barMovingStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -topScrollY.value }],
  }));

  const onPressHeader = id => {
   
    const index = headers.findIndex(header => header.id === id);
    setActiveIndex(index);
    scroll1.value = index;
  };

  const handleMomentumScrollEnd = event => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(newIndex);
  };

  return (
    <View style={styles.flex}>
      <Animated.ScrollView
        ref={topScrollRef}
        style={styles.topScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={topScrollHandler}>
        {headers.map((item, index) => (
          <View
            onLayout={e =>
              (headerWidths[index].value = e.nativeEvent.layout.width)
            }
            key={item.id}
            style={{ flex: index === 1 ? 2 : 1 }}>
            <TouchableOpacity
              style={[styles.headerItem, { paddingHorizontal: icon ? 30 : 20 }]}
              onPress={() => onPressHeader(item.id)}>
              {icon ? null : item.title == 'My Activities' ? (
                <MyactivitiesIcon active={activeIndex} />
              ) : item.title == 'Club' ? (
                <CommunitysIcon active={activeIndex === index} />
              ) : (
                <GroupsIcon active={activeIndex === index} />
              )}
              <AppText
                size={16}
                color={activeIndex == index ? COLORS.white : COLORS.grey6262}
                family={activeIndex == index ? 'PoppinsSemiB' : 'PoppinsMedium'}
                horizontal={10}>
                {item.title}
              </AppText>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.ScrollView>
      <Animated.View style={[styles.bar, barWidthStyle]}>
        <Animated.View
          style={[StyleSheet.absoluteFill, styles.barInner, barMovingStyle]}
        />
      </Animated.View>
      <Animated.ScrollView
        ref={bottomScrollRef}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onScroll={scrollHandler}>
        {headers.map((item, index) => (
          <View key={`screen-${index}`} style={{ width: width, }}>
            <ScreenComponent
              screen={item.title}
              setAddressHeight={setAddressHeight}
              navigation={navigation}
              clubId={clubId}
              id={id}
              data={data}
              viewHeight={viewHeight}
              setViewHeight={setViewHeight}
            />
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

function ScreenComponent({
  screen,
  clubId,
  navigation,
  id,
  viewHeight,
  setViewHeight,
  data,
}: any) {
  switch (screen) {
    case 'My Activities':
      return <View style={{height:viewHeight}} onLayout={(event: { nativeEvent: { layout: { height: any } } }) => {
        const { height } = event.nativeEvent.layout;
        setViewHeight(height);
      }}>
        <Myactivities setViewHeight={setViewHeight} data={data} profile={'profile'}/>
      </View >
    case 'Club':
      return <View  onLayout={(event: { nativeEvent: { layout: { height: any } } }) => {
        const { height } = event.nativeEvent.layout;
        setViewHeight(height);
      }}><ClubScreen navigation={navigation} setViewHeight={setViewHeight} data={data} />
      </View>;
    case 'Group':
      return <Group navigation={navigation} setViewHeight={setViewHeight} data={data} />;
    case 'Photos':
      return <Myactivities profile={'profile'}/>;
    case 'Gallery':
      return <Myactivities data={data} navigation={navigation}/>;
    case 'Details':
      return <EventDetails navigation={navigation} data={data} />;
    case 'Rides':
      return <EventsScreen navigation={navigation}  id={id} clubId={clubId}/>;
    case 'Members':
      return (
        <MembersScreen navigation={navigation} id={id} data={data} clubId={clubId} />
      );
    default:
      return (
        <View style={styles.item}>
          <Text style={styles.txt}>Unknown Screen</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  topScroll: {
    flexGrow: 0,
  },
  item: {
    height: '100%',
    width: width,
    backgroundColor: 'grey',
    borderWidth: 5,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerItem: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeHeaderItem: {
    backgroundColor: 'blue',
  },
  bar: {
    height: 1,
    alignSelf: 'flex-start',
  },
  barInner: {
    backgroundColor: COLORS.blue,
  },
  txt: {
    fontSize: 30,
    color: '#fff',
  },
});
