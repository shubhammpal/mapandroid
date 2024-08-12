import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../../component/CustomDrawer/CustomDrawer';
import AuthStack from './AuthStack';
import { COLORS } from '../../style';
import MarketDrawer from '../CustomDrawer/MarketDrawer';
import OTPScreen from '../../screens/Login/VerifyOtp';
import { AuthContext } from '../auth/AuthContext';
import { strings } from '../../utils/strings';
import UpdateMobile from '../../screens/SettingScreens/UpdateMobile';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    const { drawerPage}: any = useContext(AuthContext);
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: { width: "80%", },
                swipeEnabled: false,
                drawerType: 'slide',
                overlayColor: 'transparent',
                
            }}
            drawerContent={props =>  drawerPage == false ? <CustomDrawer {...props} /> : <MarketDrawer {...props}/>}
        >
             
            <Drawer.Screen name='AuthStack' component={AuthStack} />
             <Drawer.Screen name={'OtpScreen'} component={OTPScreen} />
            
        </Drawer.Navigator>
    );
};

export default DrawerNavigation;




