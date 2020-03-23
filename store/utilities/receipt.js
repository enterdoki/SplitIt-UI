import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import FormData from 'form-data';

const SET_RECEIPT_DATA = "SET_RECEIPT_DATA";
const GET_RECEIPT_DATA = "GET_RECEIPT_DATA";
const RESET_RECEIPT_DATA = "RESET_RECEIPT_DATA";

const initialState = {
    receiptData: {},
    success: false,
    pending: false,
};

const setReceiptData = (data) => {
    return {
        type: SET_RECEIPT_DATA,
        payload: data
    }
};

const getReceiptData = () => {
    return {
        type: GET_RECEIPT_DATA
    }
};

const resetReceiptData = () => {
    return {
        type: RESET_RECEIPT_DATA
    }
};

export const uploadReceiptDataThunk = (id, selectedFile) => async (dispatch) => {
    try {
        dispatch(getReceiptData());
        const data = new FormData();
        const uriParts = selectedFile.split('.');
        const fileType = uriParts[uriParts.length-1];
        const name = Math.random().toString(36).substring(7);
        data.append('image', {uri:selectedFile.replace('file://', ''), type:`image/${fileType}`, name:`${name}.${fileType}`});
        const token = await SecureStore.getItemAsync('Token');
        
        const url = await axios.post(`http://api-splitit.herokuapp.com/api/user/${id}/upload`, data, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": 'application/json',
                'content-type': 'multipart/form-data',
            }
        })
        
        const body = {
            url: url['data'].imageURL
        }
        
        const result = await axios.post('https://api.taggun.io/api/receipt/v1/simple/url', body, {
            headers: {
                "Content-Type": "application/json",
                "apikey": '82012830624911ea8bfadfb7eb1aa8b5'
              }
        })
        
        dispatch(setReceiptData(result['data']));
    }
    catch (err) {
        console.log(err);
    }
}

export const resetReceiptDataThunk = () => (dispatch) => {
    dispatch(resetReceiptData());
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_RECEIPT_DATA:
            return {
                ...state,
                receiptData: action.payload,
                success: true,
                pending: false,
            };
        case GET_RECEIPT_DATA:
            return {
                ...state,
                pending: true,
                success: false,
            };
        case RESET_RECEIPT_DATA:
            return initialState;
        default:
            return state;
    }
}