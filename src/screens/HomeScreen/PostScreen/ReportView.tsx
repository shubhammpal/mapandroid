import {
    View,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React from 'react';
  import {ms} from 'react-native-size-matters';
  import {COLORS} from '../../../style';
  import {styles} from '../styles';
  import AppText from '../../../component/AppText/AppText';
import { reportData } from '../../../component/data/mapdata';
  
  const ReportView = ({ReportApi}: any) => {
    return (
      <View>
        <View style={{height: '100%'}}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.reportContainer}>
                  <AppText
                    size={16}
                    family="PoppinsMedium"
                    color={COLORS.white}
                    align="center">
                    Report
                  </AppText>
                  <View style={{marginVertical: 20}}>
                    <AppText
                      size={16}
                      family="PoppinsBold"
                      color={COLORS.white}>
                      Why are you reporting this post?
                    </AppText>
                  </View>
                  <AppText
                    size={12}
                    family="PoppinsLight"
                    color={COLORS.grey98}>
                    Your report is anonymous, except if you're reporting an
                    intellectual property infringement. If someone is in
                    immediate danger, call the local emergency services - don't
                    wait.
                  </AppText>
                  {reportData?.map((item, index) => {
                    return (
                      <TouchableOpacity
                        style={styles.reportView}
                        key={index}
                        onPress={() => ReportApi(item?.title)}>
                        <AppText
                          size={14}
                          family="PoppinsMedium"
                          color={COLORS.white}>
                          {item?.title}
                        </AppText>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
      </View>
    );
  };
  
  export default ReportView;
  