import axios from './axios.customize';

const CreateRequestAPI = (address, detail, datetime, typeId) => {

    const URL_BACKEND = "/requests";
    const data = {
        address: address,
        datetime: datetime,
        detail: detail,
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

const fetchAllRequestByVictimAPI = () => {
    const URL_BACKEND = `/requests/my-request`;
    return axios.get(URL_BACKEND)
}

const fetchRequestDetailByIdAPI = (id) => {
    const URL_BACKEND = `/requests/${id}`;
    return axios.get(URL_BACKEND);
}

const acceptRequestAPI = (id) => {
    const URL_BACKEND = `/rescueteam/requests/${id}/accept`;
    return axios.patch(URL_BACKEND);
}

const cancelAcceptRequestAPI = (id) => {
    const URL_BACKEND = `/rescueteam/requests/${id}/cancel`;
    return axios.patch(URL_BACKEND);
}

const fetchAllRequestByRescuerAPI = () => {
    const URL_BACKEND = `/rescueteam/requests/my-accept`;
    return axios.get(URL_BACKEND)
}
const fetchChatHistoryAPI = (roomId) => {
    return axios.get(`/api/chat/history/${roomId}`);
}


export {
    fetchAllRequestAPI, CreateRequestAPI, filterStatusRequestAPI, fetchAllRequestByVictimAPI,
    fetchRequestDetailByIdAPI, acceptRequestAPI, fetchAllRequestByRescuerAPI, cancelAcceptRequestAPI,
    fetchChatHistoryAPI
}