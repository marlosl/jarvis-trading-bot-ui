import { getLocalStorageEmail, getLocalStorageName, getLocalStorageToken, getLocalStorageUsername } from '../../utils';
import { Auth, AuthActions } from './types';

const initialstate = {
    user: null,
};

type Action = {
    type: AuthActions,
    payload?: Auth
}

export default (state: any = initialstate, action: Action) => {
    if (state.user == null) {
        let user = new Auth();
        user.token = getLocalStorageToken();
        user.username = getLocalStorageUsername();
        user.email = getLocalStorageEmail();
        user.name = getLocalStorageName();
        state.user = user;
    }

    switch (action.type) {
        case AuthActions.FILL:
            return { ...state, user: action.payload };

        case AuthActions.GET:
            return state;

        case AuthActions.CLEAR:
            return { ...state, user: null };

        default:
            return state;
    }
};