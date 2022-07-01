import { getAuthHttp } from './http-common';
interface ParamServiceResponse {
    success: boolean,
    data: any,
    error: any
}

const getCandlesticks = async (idBot: string, startDate: string, endDate: string) => {
    let result : ParamServiceResponse = {
        success: false,
        data: null,
        error: null
    }

    try {
        let response = await getAuthHttp(true).get(`/analysis/${idBot}/candlesticks?start=${startDate}&end=${endDate}`);
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
    getCandlesticks
}