import { View, Text, TouchableOpacity, Image, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { ArrowBAckIcon } from '../../assets/svgImg/SvgImg'
import AppText from '../../component/AppText/AppText'
import { COLORS } from '../../style'
import socketServcies from '../../services/socket_Services'

const ChatScreen = ({ navigation }: any) => {
    const [message, setmessage] = useState()
    const [data, setData] = useState([])
   
  useEffect(()=>{
    socketServcies.initializeSocket()
  },[])
    useEffect(() => {
        socketServcies.on('received_message',(msg)=>{
            console.log('received message in forened',msg)
        })
    }, [socketServcies])
    const handlePress = () => {
        if (!!message) {
            socketServcies.emit('send_message', {
                user:36,
                content:message,
                group:16
            })
            console.log('send_message in forened')

            return;
        }
        console.log('Please enter any message')
    }
    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowBAckIcon />
                    </TouchableOpacity>
                    <Image
                        source={require('../../assets/img/event1.png')}
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: 50,
                            marginHorizontal: 15,
                        }}
                    />
                    <AppText
                        size={20}
                        color={COLORS.white}
                        family="PoppinsSemiB"
                        width={'75%'}
                        numLines={1}
                        horizontal={10}>
                        Motorhead Motorcycle
                    </AppText>
                </View>
            </View>
                <View style={{flex:1}}>
                    <TextInput
                        style={{ backgroundColor: 'white' }}
                        value={message}
                        placeholder='Enter your message'
                        onChangeText={(text) => setmessage(text)}
                    />
                <Button
                    onPress={handlePress} title='send' />
                </View>
        </View>
    )
}

export default ChatScreen

