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
        default:
            return state;
    }
}

interface Wallet {
    provider: null | any;
    isConnected: boolean;
    address: string;
}


interface WalletState {
    wallet: Wallet;
}

const interfaceWalletState: WalletState = {
    wallet: {
        provider: null,
        isConnected: false,
        address: '',
    },
};

function walletReducer(state = interfaceWalletState, action: any) {
    switch (action.type) {
        case 'SET_WALLET':
            return {
                ...state,
                wallet: {
                    ...state.wallet,
                    ...action.payload,
                }
            };
        default:
            return state;
    }
};
export interface RootState {
    userReducer: UserState;
    walletReducer: WalletState;
}

const rootReducer = combineReducers({
    userReducer,
    walletReducer,
});

export default rootReducer;