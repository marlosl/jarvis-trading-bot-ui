import { Auth } from '../store/auth/types';
import { authGet, authFill, authClear } from '../store/auth/actions';
import { store } from '../store';
import { getAuthHttp } from './http-common';
import { cleanLocalStorage, getLocalStorageToken, saveLocalStorageAuth, saveLocalStorageToken } from '../utils';
interface AuthServiceResponse {
    success: boolean,
    user: any,
    error: any
}

const createAndFillAuth = (uid: string, source: any) : Auth => {
    let token = getLocalStorageToken();
    let auth = new Auth();
    auth.uid = !!uid ? uid : '';
    auth.username = !!source.username ? source.username : '';
    auth.email = !!source.email ? source.email : '';
    auth.name = !!source.name ? source.name : '';
    saveLocalStorageAuth(token, auth);
    return auth;
}

const getStoreUser = () => {
    return store.dispatch(authGet());
}

const doLogin = async (auth: Auth) => {
    let result : AuthServiceResponse = {
        success: false,
        user: null,
        error: null
    }
    try {
        if (auth && auth.username && auth.password) {
            let response = await getAuthHttp(false).post("/login", {
                username: auth.username,
                password: auth.password
            });
            const token = response.data;
            if (token) {
                console.info("-- USER LOGGED IN TOKEN: %s --", token['token']);
                saveLocalStorageToken(token['token']);
                return fetchUser();
            } else {
                console.warn("-- USER NOT LOGGED IN USERNAME: %s --", auth.username);
            }
        }
    } catch(error) {
        console.error("------------------------- START LOGIN ERROR -------------------------");
        console.error(error);
        console.error("-------------------------- END LOGIN ERROR --------------------------");
        result.error = error;
    }
    store.dispatch(authClear());
    return result;
}

const fetchUser = async () => {
    let result : AuthServiceResponse = {
        success: false,
        user: null,
        error: null
    }
    
    let token = getLocalStorageToken();
    if (token && token.length > 0) { 
        try {
            let response = await getAuthHttp(true).get("/user-data");
            let user = response.data;
            console.log("USER DATA:", user);
            
            if (user) {
                const authUser = createAndFillAuth(user["id"], user);
                store.dispatch(authFill(authUser));
                
                result.success = true;
                result.user = user;
                return result;
            }
        } catch (err) {
            console.error("------------------------- START FETCH USER ERROR -------------------------");
            console.error(err);
            console.error("-------------------------- END FETCH USER ERROR --------------------------");
            result.error = err;
        }
    }
    store.dispatch(authClear());
    return result;    
}

const doLogout = async () => {
    cleanLocalStorage();
    store.dispatch(authClear());
    return null;      
}


export {
    getAuthHttp,
    getStoreUser,
    doLogin,
    fetchUser,
    doLogout 
}