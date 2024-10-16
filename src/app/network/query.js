
import axios from 'axios';

const axiosBaseQuery = ({ baseURL } = {}) => async ({ url, method = 'GET', data, params }, { getState }) => {
    const token = getState()?.auth?.token;
    console.log("working")
    console.log(token);
    try {
        if (token === "") {
            console.log("token is missing in axiosBaseQuery")
        }
        const result = await axios({
            baseURL,
            url,
            method,
            data,
            params,
            headers: {
                token: token
            }
        });
        return { data: result.data };
    } catch (axiosError) {
        return { error: { status: axiosError.response?.status, message: axiosError.message } };
    }
};

export default axiosBaseQuery;
