import { getAuthHttp } from './http-common';
interface ParamServiceResponse {
    success: boolean,
    data: any,
    error: any
}

const getBotParametersDataList = async () => {
    let result : ParamServiceResponse = {
        success: false,
        data: [],
        error: null
    }

    try {
        let response = await getAuthHttp(true).get("/bot-parameters");
        
        if (response.data) {
            result.data = response.data;
            result.success = true;
        }
    } catch (err) {
        console.error("------------------------- START FETCH ALL BOT PARAMETERS DATA ERROR -------------------------");
        console.error(err);
        console.error("-------------------------- END FETCH ALL BOT PARAMETERS DATA ERROR --------------------------");
        result.error = err;
    }

    return result;
}

const getBotParameters = async (id: string) => {
    let result : ParamServiceResponse = {
        success: false,
        data: null,
        error: null
    }

    try {
        let response = await getAuthHttp(true).get("/bot-parameters/" + id);
        
        if (response.data) {
            result.data = response.data;
            result.success = true;
        }
    } catch (err) {
        console.error("------------------------- START FETCH BOT PARAMETERS DATA ERROR -------------------------");
        console.error(err);
        console.error("-------------------------- END FETCH BOT PARAMETERS DATA ERROR --------------------------");
        result.error = err;
    }

    return result;
}

const postBotParameters = async (data: any) => {
    let result : ParamServiceResponse = {
        success: false,
        data: null,
        error: null
    }

    try {
        let response = await getAuthHttp(true).post("/bot-parameters", data);
        
        if (response.data) {
            result.data = response.data;
            result.success = true;
        }
    } catch (err) {
        console.error("------------------------- START FETCH BOT PARAMETERS DATA ERROR -------------------------");
        console.error(err);
        console.error("-------------------------- END FETCH BOT PARAMETERS DATA ERROR --------------------------");
        result.error = err;
    }

    return result;
}

const putBotParameters = async (data: any) => {
    let result : ParamServiceResponse = {
        success: false,
        data: null,
        error: null
    }

    try {
        let response = await getAuthHttp(true).put("/bot-parameters", data);
        if (response.data) {
            result.data = response.data;
            result.success = true;
        }
    } catch (err) {
        console.error("------------------------- START FETCH BOT PARAMETERS DATA ERROR -------------------------");
        console.error(err);
        console.error("-------------------------- END FETCH BOT PARAMETERS DATA ERROR --------------------------");
        result.error = err;
    }

    return result;
}

const deleteBotParameters = async (id: string) => {
    let result : ParamServiceResponse = {
        success: false,
        data: null,
        error: null
    }
        
    try {
        let response = await getAuthHttp(true).delete("/bot-parameters/" + id);
        
        if (response.data) {
            result.data = response.data;
            result.success = true;            
        }
    } catch (err) {
        console.error("------------------------- START FETCH BOT PARAMETERS DATA ERROR -------------------------");
        console.error(err);
        console.error("-------------------------- END FETCH BOT PARAMETERS DATA ERROR --------------------------");
        result.error = err;
    }
    return result;
}

export {
    getBotParametersDataList,
    getBotParameters,
    postBotParameters,
    putBotParameters,
    deleteBotParameters
}