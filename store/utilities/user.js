import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const SET_CURRENT_USER = "SET_CURRENT_USER";

const initialState = {
    user: {},
    loading: false,
};

const setCurrentUser = userData => {
    return {
        type: SET_CURRENT_USER,
        payload: userData
    };
};

export const registerUserThunk = (userData, navigation) => async (dispatch) => {
    try {
        const data = await axios.post('http://api-splitit.herokuapp.com/api/auth/register/', userData)
        if (data.status === 201) {
          navigation.navigate('LoginScreen');
        }
    } catch (err) {
        console.log(err);
    }
};

export const loginUserThunk = (userData, navigation) => async (dispatch) => {
    try {
        const { data } = await axios.post('http://api-splitit.herokuapp.com/api/auth/login/', userData)
        if (data['token']) {
            await SecureStore.setItemAsync('Token', data['token']);
            dispatch(setCurrentUser(data['user']));
            navigation.replace('HomeScreen')
        }
    } catch (err) {
        console.log(err);
    }
};

export const logoutUserThunk = (navigation) => async(dispatch) => {
    try {
        await SecureStore.deleteItemAsync('Token');
        dispatch(setCurrentUser({}));
        navigation.replace('LoginScreen');
    } catch(err) {
        console.log(err);
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
}