import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const SET_FRIEND_DATA = "SET_FRIEND_DATA";
const SET_PENDING_FRIEND_DATA = "SET_PENDING_FRIEND_DATA";
const ACCEPT_FRIEND = "ACCEPT_FRIEND";
const DELETE_FRIEND = "DELETE_FRIEND";
const ADD_FRIEND = "ADD_FRIEND";
const DECLINE_FRIEND = "DECLINE_FRIEND";
const RESET_FRIEND_DATA = "RESET_FRIEND_DATA";
const PAY_BALANCE = "PAY_BALANCE";

const initialState = {
    data: [],
    friends: [],
    pending: [],
    blocked: [],
    balance: 0,
};

const payBalance = (data) => {
    return {
        type: PAY_BALANCE,
        payload: data
    }
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

const resetFriendData = () => {
    return {
        type: RESET_FRIEND_DATA
    }
}

export const payBalanceThunk = (amount, data) => async(dispatch) => {
    try {
        console.log(amount);
        dispatch(payBalance({amount, data}));
    } catch(err) {  
        console.log(err);
    }
}

export const getFriendsThunk = (id) => async (dispatch) => {
    try {
        const token = await SecureStore.getItemAsync('Token');
        const { data } = await axios.get(`http://api-splitit.herokuapp.com/api/friend/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })

        let friends = [];
        let total = 0;
        for(let i = 0; i < data.length; i++) {
            total += data[i].balance
            friends.push(data[i].userTwo)
        }
        
        dispatch(setFriendData({friends,total, data}));
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
        const token = await SecureStore.getItemAsync('Token');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://api-splitit.herokuapp.com/api/friend/request/${idOne}/${idTwo}`, requestOptions)
            .then(response => response.text())
            .then(() => dispatch(addFriend(data)))
            .catch(error => console.log('error', error));

    } catch (err) {
        console.log(err);
    }
}

export const acceptFriendThunk = (data, idOne, idTwo) => async (dispatch) => {
    try {
        const token = await SecureStore.getItemAsync('Token');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://api-splitit.herokuapp.com/api/friend/accept/${idOne}/${idTwo}`, requestOptions)
            .then(response => response.text())
            .then(() => dispatch(acceptFriend(data)))
            .catch(error => console.log('error', error));

    } catch (err) {
        console.log(err);
    }
}

export const declineFriendThunk = (data, idOne, idTwo) => async (dispatch) => {
    try {
        const token = await SecureStore.getItemAsync('Token');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://api-splitit.herokuapp.com/api/friend/decline/${idOne}/${idTwo}`, requestOptions)
            .then(response => response.text())
            .then(() => dispatch(declineFriend(data)))
            .catch(error => console.log('error', error));
        
    } catch (err) {
        console.log(err);
    }
}

export const deleteFriendThunk = (data, idOne, idTwo) => async (dispatch) => {
    try {
        const token = await SecureStore.getItemAsync('Token');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://api-splitit.herokuapp.com/api/friend/unfriend/${idOne}/${idTwo}`, requestOptions)
            .then(response => response.text())
            .then(() => dispatch(deleteFriend(data)))
            .catch(error => console.log('error', error));
        
    } catch (err) {
        console.log(err);
    }
}

export const resetFriendDataThunk = () => (dispatch) => {
    dispatch(resetFriendData());
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PAY_BALANCE: 
            return {
                ...state,
                balance: state.balance - action.payload.amount,
                data: state.data.filter(item => item != action.payload.data)
            };
        case SET_FRIEND_DATA:
            return {
                ...state,
                friends: action.payload.friends,
                balance: action.payload.total,
                data: action.payload.data
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
        case RESET_FRIEND_DATA:
            return initialState
        default:
            return state;
    }
}