import { Auth, AuthActions } from './types';

const authFill = (payload: Auth) => ({
    type: AuthActions.FILL,
    payload
});

const authGet = () => ({
    type: AuthActions.GET
});

const authClear = () => ({
    type: AuthActions.CLEAR
});

export { authGet, authFill, authClear }