import { getAuthHttp } from './http-common';
interface ParamServiceResponse {
    success: boolean,
    data: any,
    error: any
}

const getParameters = async () => {
    let result : ParamServiceResponse = {
        success: false,
        data: null,
        error: null
    }

    try {
        let response = await getAuthHttp(true).get("/parameters");
        
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

const postParameters = async (data: any) => {
    let result : ParamServiceResponse = {
        success: false,
        data: null,
        error: null
    }

    try {
        let response = await getAuthHttp(true).post("/parameters", data);
        console.log("BOT PARAMETERS DATA:", response.data);
        
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

const putParameters = async (data: any) => {
    let result : ParamServiceResponse = {
        success: false,
        data: null,
        error: null
    }

    try {
        let response = await getAuthHttp(true).put("/parameters", data);
        
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

const deleteParameters = async (id: string) => {
    let result : ParamServiceResponse = {
        success: false,
        data: null,
        error: null
    }

    try {
        let response = await getAuthHttp(true).delete("/parameters/" + id);
        console.log("BOT PARAMETERS DATA:", response.data);
        
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
    getParameters,
    postParameters,
    putParameters,
    deleteParameters
}