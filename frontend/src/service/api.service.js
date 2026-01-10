import axios from './axios.customize';

const CreateRequestAPI = (address, detail, datetime, typeId, image) => {

    const URL_BACKEND = "/requests";
    const data = {
        address: address,
        datetime: datetime,
        detail: detail,
        type: {
            id: typeId
        },
        image: image
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

const deleteRequestAPI = (id) => {
    const URL_BACKEND = `/requests/${id}`;
    return axios.delete(URL_BACKEND);
}

const updateRequestAPI = (id, address, detail, typeId, image) => {

    const URL_BACKEND = `/requests/${id}`;
    const data = {
        address: address,
        detail: detail,
        type: {
            id: typeId
        },
        image: image
    }

    return axios.put(URL_BACKEND, data);
}

const completeAcceptRequestAPI = (id) => {
    const URL_BACKEND = `/rescueteam/requests/${id}/complete`;
    return axios.patch(URL_BACKEND);
}

const searchRequestByKeywordAPI = (keyword) => {
    const URL_BACKEND = `/requests/search`;
    return axios.get(URL_BACKEND, {
        params: { keyword }
    });
}

export {
    fetchAllRequestAPI, CreateRequestAPI, filterStatusRequestAPI, fetchAllRequestByVictimAPI,
    fetchRequestDetailByIdAPI, acceptRequestAPI, fetchAllRequestByRescuerAPI, cancelAcceptRequestAPI,
    fetchChatHistoryAPI, deleteRequestAPI, updateRequestAPI, completeAcceptRequestAPI, searchRequestByKeywordAPI
}