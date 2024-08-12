import {
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { ArrowBAckIcon } from '../../../assets/svgImg/SvgImg';
import SubmitButton from '../../../component/ButtonCotainer/SubmitButton';
import emitter from '../../../component/Emitter/emitter';
import { AuthContext } from '../../../component/auth/AuthContext';
import AppText from '../../../component/AppText/AppText';
import { COLORS } from '../../../style';
import { styles } from '../Clubonboarding/styles';
import { requestFeedbackcreate } from '../../../services/api_Services';

const HelpScreen = ({ navigation }: any) => {
    const [description, setDescription] = React.useState<any>('');
    const [loader, setloader] = useState<boolean>(false);
    const { userDetails, userToken }: any = useContext(AuthContext);
  
    return (
        <View style={styles.containerfeedback}>
            <SafeAreaView />
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? 'padding' : ''} keyboardVerticalOffset={35}>
                <ScrollView contentContainerStyle={styles.scrollview} bounces={false} showsVerticalScrollIndicator={false}>

                    <View style={styles.container}>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 15, paddingRight: 15 }}>
                                <ArrowBAckIcon />
                            </TouchableOpacity>
                            <AppText
                                size={20}
                                color={COLORS.white}
                                family="PoppinsSemiB"
                                horizontal={10}>
                                Help
                            </AppText>
                        </View>
                        <View style={styles.sharedView}>
                            <Image
                                source={require('../../../assets/img/bikelogo.png')}
                                style={styles.logoImage}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.textinputConatiner}>
                            <View style={[styles.descriptionContainer]}>
                                <TextInput
                                    value={description}
                                    style={styles.input}
                                    placeholderTextColor={COLORS.grey92}
                                    placeholder='Description'
                                    onChangeText={(text) => setDescription(text)}
                                    multiline={true}
                                />
                            </View>

                        </View>
                    </View>
                    <SubmitButton
                        title={'Submit'}
                        widthOf={'90%'}
                        pressing={() =>{}}
                        loader={loader}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default HelpScreen;
