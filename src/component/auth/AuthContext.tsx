import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { getTokenAsyncStorage, getUserData, setIdAsyncStorage, setTokenAsyncStorage } from "../../services/auth_helper";

export const AuthContext = createContext();

export const AuthProvider = ({ children }: any) => {
    const [userToken, setUserToken] = useState(null)
    const [roles, setRoles] = useState()
    const [splashScreen, setSplashScreen] = useState(false)
    const [userDetails, setUserDetails] = useState<any>()
    const [itsId, setItsId] = useState()
    const [authprofile, setAuthProfile] = useState('')
    const [location, setLocation] = useState<any>()
    const [sosStatus, setSosstatus] = useState<any>(false)
    const [sliderStatus, setSliderstatus] = useState<any>(true)
    const [drawerPage, setDrawerPage] = useState<any>(false)
    const [postLocation, setPostLocation] = useState<any>('')
    const [tagUsers, setTagUsers] = useState<any>([])
    const loginPress = async (user: any) => {
        let storeUser: any = await getUserData()
        setUserDetails(user?.payload)
        if (storeUser) {
            await setTokenAsyncStorage(user?.token)
            await setIdAsyncStorage(user?.payload?.id)
            setUserToken(user?.token)
        }
    }
    const socialloginPress = async (user: any) => {
        let storeUser: any = await getUserData()
        setUserDetails(user?.user)
        if (storeUser) {
            await setTokenAsyncStorage(user?.token)
            setUserToken(user?.token)
        }
    }
    const userloginPress = async (user: any) => {
        let storeUser: any = await getUserData()
        setUserDetails(user)
    }

    const userProfilePic = async (user: any) => {
        setAuthProfile(user)
    }
    const logoutPress = async () => {
        await AsyncStorage.removeItem('@user')
        await AsyncStorage.clear()

        setUserToken(null)
        setUserDetails(null)

    }

    const isLoggedIn = async () => {
        setSplashScreen(true)
        try {
            let response = await getUserData()
            if (response) {
                let token: any = await getTokenAsyncStorage()
                setUserDetails(response)
                if (token) {
                    setUserToken(token)
                }
            } else {
                
                setUserToken(null)
            }
        } catch (error) {
           
            console.log(error)
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, [])

    return (
        <AuthContext.Provider value={{ loginPress, userloginPress,socialloginPress, userDetails,userProfilePic, userToken,
            location, setLocation,sosStatus,setSosstatus,sliderStatus, setSliderstatus, setAuthProfile, authprofile, setUserToken, setUserDetails, logoutPress, roles, itsId, setDrawerPage, drawerPage, postLocation, setPostLocation, tagUsers, setTagUsers }}>
            {children}
        </AuthContext.Provider>
    )
}