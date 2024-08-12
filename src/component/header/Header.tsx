import {BlurView} from '@react-native-community/blur';
import {
  Animated,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native-animatable';
import {black} from '../../style/Colors';
import {ArrowBAckIcon} from '../../assets/svgImg/SvgImg';
import AppText from '../AppText/AppText';
import {moderateScale} from 'react-native-size-matters';
type SimpleHeaderType = {
  navigation: any;
  label: string;
};
// create a component
const SimpleHeader: React.FC<SimpleHeaderType> = ({navigation, label}) => {
  return (
    <>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <ArrowBAckIcon color={black} />
        </TouchableOpacity>
        <AppText size={20} family='PoppinsSemiB' children={label} />
      </View>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: moderateScale(60),
    paddingHorizontal: 20,
  },
  button: {
    padding: 8,
    marginRight: 20,
  },
});

//make this component available to the app
export default SimpleHeader;
