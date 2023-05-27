import { combineReducers } from 'redux';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    pin: string;
}

interface UserState {
    user: User | null;
}

const initialUserState: UserState = {
    user: null,
};

function userReducer(state = initialUserState, action: any) {
    switch (action.type) {
        case 'SIGNUP':
            return {
                ...state,
                user: action.payload,
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
