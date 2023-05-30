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