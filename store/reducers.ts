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
    firstTime: boolean;
    balance: object | any;
    profilePicture: string | any;
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
        authenticated: false,
        token: '',
        otp: '',
        firstTime: true,
        profilePicture: '',
        balance: {
            eth: {
                tokenBalance: 0,
                usdBalance: 0,
            },
            usdt: {
                tokenBalance: 0,
                usdBalance: 0,
            },
            usdc: {
                tokenBalance: 0,
                usdBalance: 0,
            },
        }
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
        case 'SET_FIRST_TIME':
            return {
                ...state,
                user: {
                    ...state.user,
                    firstTime: false,
                }
            };
        case 'LOGOUT':
            return {
                ...state,
                user: {
                    ...state.user,
                    authenticated: false,
                    token: '',
                }
            };
        case 'SET_BALANCE':
            return {
                ...state,
                user: {
                    ...state.user,
                    balance: action.payload,
                }
            };
        case 'SET_PROFILE_PICTURE':
            return {
                ...state,
                user: {
                    ...state.user,
                    profilePicture: action.payload,
                }
            };
        default:
            return state;
    }
}

export interface RootState {
    userReducer: UserState;
}

const rootReducer = combineReducers({
    userReducer,
});

export default rootReducer;