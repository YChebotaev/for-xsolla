const GET_LIST = 'GET_LIST';
const GET_ONE = 'GET_ONE';
const GET_MANY = 'GET_MANY';
const GET_MANY_REFERENCE = 'GET_MANY_REFERENCE';
const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const DELETE = 'DELETE';

const apiStructure = {
    'users': {
        [GET_LIST]: {
            apiPath: 'users',
            idAttribute: 'user_id'
        },
        [GET_ONE]: {
            apiPath: 'users/{id}',
            idAttribute: 'user_id'
        },
        [CREATE]: {
            apiPath: 'users',
            idAttribute: 'user_id',
            emptyResponse: true
        }
    },
    'user_balance': {
        [CREATE]: {
            apiPath: 'users/{user_id}/recharge',
            idAttribute: 'user_id'
        }
    },
    'user_transactions': {
        [GET_LIST]: {
            apiPath: 'users/{id}/transactions',
            noPagintaion: true
        }
    }
};

export const fetchOptions = (url, type, params, { noPagintaion }) => {
    switch (type) {
        case GET_LIST:
            const { pagination: { page, perPage }, filter } = params;
            if (!noPagintaion) {
                const offset = perPage * (page - 1);
                const limit = perPage;
                url.searchParams.append('offset', offset);
                url.searchParams.append('limit', limit);
            }
            Object.keys(filter).forEach((key) => {
                url.searchParams.append(key, filter[key]);
            });
            return {
                method: 'GET'
            };
        case GET_ONE:
            return {
                method: 'GET'
            };
        case GET_MANY:
            return {};
        case GET_MANY_REFERENCE:
            return {};
        case CREATE:
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json');
            return {
                method: 'POST',
                headers,
                body: JSON.stringify(params.data)
            };
        case UPDATE:
            return {};
        case DELETE:
            return {};
        default:
            return {};
    }
};

export const assignIds = (respData, idAttribute) => {
    const { data } = respData;
    const id = respData[idAttribute];
    if (data != null) {
        respData.data = data.map((item) => Object.assign(item, {
            id: item[idAttribute]
        }));
    } else
    if (id != null) {
        respData.id = id;
    }
    return respData;
};

export const convertResponse = (type, resource, respData) => {
    if (respData.http_status_code != null && respData.http_status_code >= 399) {
        throw new Error(respData);
    }

    switch (type) {
        case GET_LIST:
            return {
                data: respData.data,
                total: respData.recordsTotal
            };
        case CREATE:
        case GET_ONE:
            return {
                data: respData
            };
        default:
            return {
                data: respData.data
            };
    }
};

export default ({ apiEndpoint, projectId }) => {
    const apiUrl = new URL(`${projectId}/`, apiEndpoint);
    return (type, resource, params) => {
        const apiSection = apiStructure[resource];
        if (apiSection) {
            let typeUrl = (apiSection[type] || {}).apiPath;
            const typeIdAttribute = (apiSection[type] || {}).idAttribute;
            const typeEmptyResponse = (apiSection[type] || {}).emptyResponse;
            const noPagintaion = !!(apiSection[type] || {}).noPagintaion;
            if (type === GET_ONE && params.id != null) {
                typeUrl = typeUrl.replace('{id}', params.id);
            }
            if (type === CREATE && params.data != null && typeIdAttribute != null) {
                typeUrl = typeUrl.replace(`{${typeIdAttribute}}`, params.data[typeIdAttribute]);
            }
            if (typeUrl) {
                const actionUrl = new URL(typeUrl, apiUrl);
                return fetch(actionUrl, fetchOptions(actionUrl, type, params, { noPagintaion }))
                    .then((resp) => {
                        return typeEmptyResponse ? params.data : resp.json();
                    })
                    .then((respData) => convertResponse(type, resource, assignIds(respData, typeIdAttribute)));
            }
        }
    };
};
