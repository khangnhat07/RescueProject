import axios from './axios.customize';

const CreateRequestAPI = (victimId, address, detail, status, datetime, typeId) => {

    const URL_BACKEND = "/requests";
    const data = {
        victim: {
            id: victimId
        },
        address: address,
        datetime: datetime,
        detail: detail,
        status: status,
        type: {
            id: typeId
        }
    }
    return axios.post(URL_BACKEND, data)

}

const fetchAllRequestAPI = () => {
    const URL_BACKEND = "/requests";
    return axios.get(URL_BACKEND)

}

export {
    fetchAllRequestAPI, CreateRequestAPI
}