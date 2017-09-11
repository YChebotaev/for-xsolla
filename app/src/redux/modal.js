export const OPEN_MODAL = 'MODAL//OPEN_MODAL';
export const CLOSE_MODAL = 'MODAL//CLOSE_MODAL';

export const reducer = (state = {}, { type, payload }) => {
    switch (type) {
        case OPEN_MODAL:
            return Object.assign({}, state, {[payload]: true});
        case CLOSE_MODAL:
            return Object.assign({}, state, {[payload]: false});
        default:
            return state;
    }
};

export const openModal = (name) => {
    return {
        type: OPEN_MODAL,
        payload: name
    };
};

export const closeModal = (name) => {
    return {
        type: CLOSE_MODAL,
        payload: name
    };
};
