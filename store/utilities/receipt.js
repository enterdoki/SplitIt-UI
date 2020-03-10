import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

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

export const getReceiptDataThunk = (id, selectedFile) => async (dispatch) => {
    try {
        console.log(selectedFile);
        const data = new FormData();
        data.append('file', selectedFile);
        const token = await SecureStore.getItemAsync('Token');
        console.log(data);
        
        const result = await axios.post(`http://api-splitit.herokuapp.com/api/user/${id}/upload`, data, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": 'application/json',
                'content-type': 'multipart/form-data; boundary=--------------------------996783159796851424496141',
            }
        })

        // const result = await axios.post('https://api.taggun.io/api/receipt/v1/simple/file', data, {
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //         "Accept": "application/json",
        //         "apikey": '82012830624911ea8bfadfb7eb1aa8b5'
        //     }
        // });
        console.log(result);
        // dispatch(getReceiptData(result));
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