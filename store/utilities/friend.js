import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const SET_FRIEND_DATA = "SET_FRIEND_DATA";
const SET_PENDING_FRIEND_DATA = "SET_PENDING_FRIEND_DATA";
const ACCEPT_FRIEND = "ACCEPT_FRIEND";
const DELETE_FRIEND = "DELETE_FRIEND";
const ADD_FRIEND = "ADD_FRIEND";
const DECLINE_FRIEND = "DECLINE_FRIEND";

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

const addFriend = (data) => {
    return {
        type: ADD_FRIEND,
        payload: data
    }
};

const deleteFriend = (data) => {
    return {
        type: DELETE_FRIEND,
        payload: data
    }
};

const acceptFriend = (data) => {
    return {
        type: ACCEPT_FRIEND,
        payload: data
    }
};

const declineFriend = (data) => {
    return {
        type: DECLINE_FRIEND,
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

export const addFriendThunk = (data, idOne, idTwo) => async (dispatch) => {
    try {
        dispatch(addFriend(data));
    } catch (err) {
        console.log(err);
    }
}

export const acceptFriendThunk = (data, idOne, idTwo) => async (dispatch) => {
    try {
        dispatch(acceptFriend(data));
    } catch (err) {
        console.log(err);
    }
}

export const declineFriendThunk = (data, idOne, idTwo) => async (dispatch) => {
    try {
        dispatch(declineFriend(data));
    } catch (err) {
        console.log(err);
    }
}

export const deleteFriendThunk = (data, idOne, idTwo) => async (dispatch) => {
    try {
        dispatch(deleteFriend(data));
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
            };
        case ACCEPT_FRIEND:
            return {
                ...state,
                friends: [...state.friends, action.payload],
                pending: state.pending.filter(item => item != action.payload)
            }
        case DECLINE_FRIEND:
            return {
                ...state,
                pending: state.pending.filter(item => item != action.payload)
            };
        case ADD_FRIEND:
            return {
                ...state,
                pending: [...state.pending, action.payload]
            };
        case DELETE_FRIEND:
            return {
                ...state,
                friends: state.friends.filter(item => item != action.payload)
            }
        default:
            return state;
    }
}