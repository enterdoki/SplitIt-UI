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


export const registerUserThunk = (userData) => async (dispatch) => {
    try {
        console.log('register');
    } catch (err) {
        console.log(err);
    }
};


export const loginUserThunk = (userData) => async (dispatch) => {
    try {
        console.log('login');
    } catch (err) {
        console.log(err);
    }
}

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