import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import FormData from 'form-data';

const GET_RECEIPT_DATA = "GET_RECEIPT_DATA";

const initialState = {
    receiptData: {},
    loading: false,
};

const getReceiptData = (data) => {
    return {
        type: GET_RECEIPT_DATA,
        payload: data
    }
}

export const uploadReceiptDataThunk = (id, selectedFile) => async (dispatch) => {
    try {
        
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
        
        dispatch(getReceiptData(result['data']));
    }
    catch (err) {
        console.log(err);
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_RECEIPT_DATA:
            return {
                ...state,
                receiptData: action.payload,
            };
        default:
            return state;
    }
}