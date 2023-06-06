import { combineReducers } from 'redux';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    cryptoTag: string;
    pin: string;
    authenticated: boolean;
    token: string;
    otp: string;
}

interface UserState {
    user: User | null;
}

const initialUserState: UserState = {
    user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        cryptoTag: '',
        pin: '',
        authenticated: true,
        token: '',
        otp: '',
    },
};

function userReducer(state = initialUserState, action: any) {
    switch (action.type) {
        case 'SIGNUP':
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                }
            };
        case 'AUTHENTICATE':
            return {
                ...state,
                user: {
                    ...state.user,
                    authenticated: true,
                }
            };
        case 'LOGIN':
            return {
                ...state,
                user: {
                    ...state.user,
                    authenticated: true,
                    token: action.payload.token,
                }
            };
        case 'VERIFY_OTP':
            return {
                ...state,
                user: {
                    ...state.user,
                    otp: action.payload.otp,
                    email: action.payload.email,
                }
            };
        default:
            return state;
    }
}

interface navigateState {
    cryptoAppScreen: boolean;
};

const initialNavigateState: navigateState = {
    cryptoAppScreen: true,
};

function navigateReducer(state = initialNavigateState, action: any) {
    switch (action.type) {
        case 'CRYPTO_APP_SCREEN_TRUE':
            return {
                ...state,
                cryptoAppScreen: true,
            };
        case 'CRYPTO_APP_SCREEN_FALSE':
            return {
                ...state,
                cryptoAppScreen: false,
            };
        default:
            return state;
    }
}

export interface RootState {
    userReducer: UserState;
    navigateReducer: navigateState;
}

const rootReducer = combineReducers({
    userReducer,
    navigateReducer,
});

export default rootReducer;