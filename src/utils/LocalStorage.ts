import { Auth } from "../store/auth/types";

const STORAGE_TOKEN = "jarvis-trade-token";
const STORAGE_USERNAME = "jarvis-trade-username";
const STORAGE_EMAIL = "jarvis-trade-email";
const STORAGE_NAME = "jarvis-trade-name";

const cleanLocalStorage = () : void => {
    localStorage.removeItem(STORAGE_TOKEN);
    localStorage.removeItem(STORAGE_USERNAME);
    localStorage.removeItem(STORAGE_EMAIL);
    localStorage.removeItem(STORAGE_NAME);
}

const saveLocalStorageAuth = (token: string, auth: Auth) : void => {
    cleanLocalStorage();
    localStorage.setItem(STORAGE_TOKEN, token);
    localStorage.setItem(STORAGE_USERNAME, auth.username);
    localStorage.setItem(STORAGE_EMAIL, auth.email);
    localStorage.setItem(STORAGE_NAME, auth.name);    
}

const getLocalStorageValue = (key: string) : string => {
    let value = localStorage.getItem(key)
    return value ? value : '';
}

const getLocalStorageToken = () : string => {
    return getLocalStorageValue(STORAGE_TOKEN);
}

const getLocalStorageUsername = () : string => {
    return getLocalStorageValue(STORAGE_USERNAME);
}

const getLocalStorageEmail = () : string => {
    return getLocalStorageValue(STORAGE_EMAIL);
}

const getLocalStorageName = () : string => {
    return getLocalStorageValue(STORAGE_NAME);
}

const saveLocalStorageValue = (key: string, value: string) : void => {
    localStorage.removeItem(key);
    localStorage.setItem(key, value);
}

const saveLocalStorageToken = (value: string) : void => {
    saveLocalStorageValue(STORAGE_TOKEN, value);
}

const saveLocalStorageUsername = (value: string) : void => {
    saveLocalStorageValue(STORAGE_USERNAME, value);
}

const saveLocalStorageEmail = (value: string) : void => {
    saveLocalStorageValue(STORAGE_EMAIL, value);
}

const saveLocalStorageName = (value: string) : void => {
    saveLocalStorageValue(STORAGE_NAME, value);
}

export { 
    cleanLocalStorage, 
    saveLocalStorageAuth, 
    getLocalStorageToken, 
    getLocalStorageUsername, 
    getLocalStorageEmail, 
    getLocalStorageName,    
    saveLocalStorageValue,
    saveLocalStorageToken,
    saveLocalStorageUsername,
    saveLocalStorageEmail,
    saveLocalStorageName
};