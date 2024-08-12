import AsyncStorage from "@react-native-async-storage/async-storage";
import { MAP_API_URL, MAP_KEY } from "./api_helper";

export const setTokenAsyncStorage = async (data: any) => {
  try {
    return await AsyncStorage.setItem('TOKEN', data);
  } catch (error) {
    console.log(error);
  }
};

export const getTokenAsyncStorage = async () => {
  try {
    const value = await AsyncStorage.getItem('TOKEN');
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(error);
  }
};
export const setUserData = async (data: string) => {
  try {
    return await AsyncStorage.setItem('@user', JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const getUserData = async () => {
  try {
    const value : any= await AsyncStorage.getItem('@user');
    const userData = JSON.parse(value)
    if (userData !== null) {
      return userData;
    }
  } catch (error) {
    console.log(error);
  }
};





const makeApiRequest = async (endpoint: any, method: any, body = null, token = null) => {
    const options : any = {
        method,
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json",
            'Authorization': token ? `Bearer ${token}` : null
        },
        body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(`${MAP_API_URL}${endpoint}`, options);
    const data = await response.json();

    return data;
};


export const requestMapApi = async (data: any) => {
    
    const endpoint = `?keyword=${data?.keyword}&radius=${data?.radius}&type=${data?.type}&location=${data?.lat},${data?.long}&key=${MAP_KEY}`;
    return await makeApiRequest(endpoint, "GET");
};
export const setIdAsyncStorage = async (id: number) => {
  try {
    return await AsyncStorage.setItem('ID', id.toString());
  } catch (error) {
    console.log(error);
  }
};

export const getIdAsyncStorage = async () => {
  try {
    const value = await AsyncStorage.getItem('ID');
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(error);
  }
};



///ship roket 


export const setShipTokenAsyncStorage = async (token: string) => {
  try {
    return await AsyncStorage.setItem('TOKEN', token.toString());
  } catch (error) {
    console.log(error);
  }
};

export const getShipTokenAsyncStorage = async () => {
  try {
    const value = await AsyncStorage.getItem('TOKEN');
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(error);
  }
};