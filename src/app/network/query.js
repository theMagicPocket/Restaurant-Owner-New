// network/axiosBaseQuery.js

import axios from 'axios';

const axiosBaseQuery = ({ baseURL } = {}) => async ({ url, method = 'GET', data, params }) => {
    try {
        const result = await axios({
            baseURL,
            url,
            method,
            data,
            params,
            headers: {
                token: "dev"
            }
        });
        return { data: result.data };
    } catch (axiosError) {
        return { error: { status: axiosError.response?.status, message: axiosError.message } };
    }
};

export default axiosBaseQuery;
