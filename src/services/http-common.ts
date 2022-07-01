import axios, { AxiosInstance } from "axios";
import { getLocalStorageToken } from "../utils";

const getHttp = () : AxiosInstance => {
    return axios.create({
        baseURL: "https://trade.lumi.dev.br/api",
        headers: {
            "Content-type": "application/json"
        }
    })
}

const getAuthHttp = (authenticate?: boolean) : AxiosInstance => {
    let auth = authenticate || true;
    let token = getLocalStorageToken();
    const http = getHttp();

    delete http.defaults.headers.common["Authorization"];
    if (auth && token) {
        http.defaults.headers.common["Authorization"] = `Bearer ${token}` 
    }
    return http;
}

export { getHttp, getAuthHttp };