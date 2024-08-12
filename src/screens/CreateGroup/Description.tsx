import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { styles } from './styles';
import { ArrowBAckIcon, BackgroundIcon, CreateCameraIcon, CreateLocation, GlobalIcon, SmallArrowDownIcon, TagRidersicon, VideoImageIcon } from '../../assets/svgImg/SvgImg';
import AppText from '../../component/AppText/AppText';
import { COLORS, ms } from '../../style';
import { strings } from '../../utils/strings';
import BottomSheet from '@gorhom/bottom-sheet';
import { height, width } from '../../style/typography';
import SubmitButton from '../../component/ButtonCotainer/SubmitButton';
import { Formik } from 'formik';
import { validationSchema } from '../../utils/Schema';

type DescriptionProps = {
    navigation: any,
    route:any
}

const Description = ({ navigation ,route}: DescriptionProps) => {
    const [description, setDescription] = useState<any>('');
    const [borderColor, setBorderColor] = useState<string>(COLORS.semigrey);
    const handleFocus = () => {
        setBorderColor(COLORS.blue);
    };
    return (
        <View style={[styles.container]}>
            <SafeAreaView />
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? 'padding' : ''} keyboardVerticalOffset={35}>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
            <Formik
                initialValues={{ description: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    navigation.replace('CoverImage', {
                      name: route?.params?.name,
                      description: values?.description,
                    });
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <View style={styles.mainContainer}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => navigation.goBack()} style={{paddingVertical: 15, paddingRight: 15}}>
                                    <ArrowBAckIcon />
                                </TouchableOpacity>
                                <AppText size={20} color={COLORS.white} family='PoppinsSemiB' horizontal={10}>Add a description</AppText>
                            </View>
                            <View style={[styles.descriptionContainer, { borderColor }]}>
                                <TextInput
                                    value={values.description}
                                    style={styles.input}
                                    placeholderTextColor={COLORS.grey92}
                                    placeholder='Describe your group'
                                    onChangeText={handleChange('description')}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    multiline={true}
                                />
                            </View>
                                {touched.description && errors.description && (
                                    <AppText size={14} color={COLORS.red} family='PoppinsMedium' align='right'>
                                        {errors.description}
                                    </AppText>
                                )}
                        </View>
                        <View style={{ marginHorizontal: ms(2), marginVertical: ms(5) }}>
                           <SubmitButton
                                title={'Next'}
                                pressing={handleSubmit}
                                colorChange={values.description === '' ? '#2B4050' : null}
                                colortext={values.description === '' ? '#758FA4' : null}
                                widthOf={'98%'}
                            />
                        </View>
                    </>
                )}
            </Formik>
            </ScrollView>
            </KeyboardAvoidingView>
        </View>

    );
}

export default Description;
