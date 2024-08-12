import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../../utils/misc';
import { strings } from '../../../utils/strings';

interface Step {
  title: string;
  date: string;
  time: string;
  reason?: string;
}
type StepperType = {
  navigation: any;
  stepData: Step[];
  onCancel: () => void;
};

const Stepper: React.FC<StepperType> = ({stepData, navigation,onCancel}) => {
  const [steps, setSteps] = useState(stepData);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    setSteps(stepData);
  }, [stepData]);

  const handleCancel = () => {
    navigation.navigate(strings.REQUESTCANCELORDER_SCREEN);
  };

  const handleRefund = () => {
    setSteps(prevSteps => [
      ...prevSteps.slice(0, 3), 
      {
        title: 'Refunded',
        date: '10 July 2024',
        time: 'Till Evening',
        reason: 'Your refund is processed successfully',
      },
    ]);
    setCurrentStep(4);
  };

  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <View style={styles.stepIndicator}>
            <View
              style={[
                styles.stepCircle,
                index < currentStep
                  ? styles.completedCircle
                  : index === currentStep
                  ? styles.activeCircle
                  : styles.inactiveCircle,
              ]}
            />
            {index < steps.length - 1 && (
              <View
                style={[
                styles.completedLine,
                  index < currentStep - 1
                    ? styles.completedLine
                    : styles.inactiveLine,
                ]}
              />
            )}
          </View>
          <View style={styles.stepDetails}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={[
                    styles.stepTitle,
                    index < currentStep
                      ? styles.completedText
                      : index === currentStep
                      ? styles.activeText
                      : styles.inactiveText,
                  ]}>
                  {step.title}
                </Text>
                <Text style={styles.stepDate}>{step.date}</Text>
              </View>
              <Text style={styles.stepTime}>{step.time}</Text>
            </View>
            {step.reason && (
              <Text style={styles.stepReason}>{step.reason}</Text>
            )}
            {index === 1 && currentStep === 1 && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={onCancel}>
                <Text style={styles.actionButtonText}>Cancel</Text>
              </TouchableOpacity>
            )}
            {index === 2 && currentStep === 2 && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleRefund}>
                <Text style={styles.actionButtonText}>Refund</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  stepIndicator: {
    alignItems: 'center',
    marginRight: 10,
  },
  stepCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    zIndex: 1,
  },
  completedCircle: {
    backgroundColor: '#2196F3',
  },
  activeCircle: {
    backgroundColor: '#2196F3',
  },
  inactiveCircle: {
    backgroundColor: '#9E9E9E',
  },
  stepLine: {
    width: 2,
    height: 60,
  },
  completedLine: {
    width: moderateScale(2),
    height: moderateScale(70),
    backgroundColor: '#2196F3',
  },
  inactiveLine: {
    backgroundColor: '#9E9E9E',
  },
  stepDetails: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontFamily: fonts.PoppinsSemiB,
  },
  completedText: {
    fontSize: 16,
    color: '#2196F3',
    fontFamily: fonts.PoppinsSemiB,
  },
  activeText: {
    color: '#2196F3',
  },
  inactiveText: {
    color: '#9E9E9E',
  },
  stepDate: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: 14,
    color: '#9E9E9E',
  },
  stepTime: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: 14,
    color: '#9E9E9E',
  },
  stepReason: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
  },
  actionButton: {
    width: moderateScale(70),
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#D4675A',
    borderRadius: 20,
  },
  actionButtonText: {
    fontFamily: fonts.PoppinsMedium,
    color: '#FFF',
    fontSize: 14,
  },
});

export default Stepper;
