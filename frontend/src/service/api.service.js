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

const filterStatusRequestAPI = (status) => {
    const URL_BACKEND = "/requests/filter-status";
    return axios.get(URL_BACKEND, {
        params: { status }
    })
}

const fetchAllRequestByVictimIdAPI = (id) => {
    const URL_BACKEND = `/requests/victim/${id}`;
    return axios.get(URL_BACKEND)
}

const fetchRequestDetailByIdAPI = (id) => {
    const URL_BACKEND = `/requests/${id}`;
    return axios.get(URL_BACKEND);
}



export {
    fetchAllRequestAPI, CreateRequestAPI, filterStatusRequestAPI, fetchAllRequestByVictimIdAPI, fetchRequestDetailByIdAPI
}