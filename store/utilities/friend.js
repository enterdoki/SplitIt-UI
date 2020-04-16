import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const SET_FRIEND_DATA = "SET_FRIEND_DATA";
const SET_PENDING_FRIEND_DATA = "SET_PENDING_FRIEND_DATA";

const initialState = {
    friends: [],
    pending: [],
    blocked: [],
};

const setFriendData = (data) => {
    return {
        type: SET_FRIEND_DATA,
        payload: data
    }
};

const setPendingFriendData = (data) => {
    return {
        type: SET_PENDING_FRIEND_DATA,
        payload: data
    }
};

export const getFriendsThunk = (id) => async (dispatch) => {
    try {
        const token = await SecureStore.getItemAsync('Token');
        const { data } = await axios.get(`http://api-splitit.herokuapp.com/api/friend/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })

        const friends = [];
        data.map(item => (
            Object.entries(item).map(([key, value]) => (
                friends.push(value)
            ))
        ))
        
        dispatch(setFriendData(friends));
    } catch (err) {
        console.log(err);
    }
}

export const getPendingFriendsThunk = (id) => async (dispatch) => {
    try {
        const token = await SecureStore.getItemAsync('Token');
        const { data } = await axios.get(`http://api-splitit.herokuapp.com/api/friend/${id}/pending`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })

        const friends = [];
        data.map(item => (
            Object.entries(item).map(([key, value]) => (
                friends.push(value)
            ))
        ))
        
        dispatch(setPendingFriendData(friends));
    } catch (err) {
        console.log(err);
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_FRIEND_DATA:
            return {
                ...state,
                friends: action.payload
            };
        case SET_PENDING_FRIEND_DATA:
            return {
                ...state,
                pending: action.payload
            }
        default:
            return state;
    }
}