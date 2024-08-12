import PushNotificationIOS from '@react-native-community/push-notification-ios';
import React,{ useEffect } from 'react'
import messaging from '@react-native-firebase/messaging';


const ForegroundHandlerIOS = ({navigation}:any) => {
    useEffect(() => {
        const unSubscribe = messaging().onMessage(async remoteMessage => {
            console.log("handle in foreground in IOS",remoteMessage)
            const {notification,messageId} : any = remoteMessage
            PushNotificationIOS.addNotificationRequest({
                id: messageId,
                body: notification?.body,
                title:notification?.title,
                sound:'default',
            });
        })
        return unSubscribe
    }, []);
    return null;
}

export default ForegroundHandlerIOS