import types from 'constants/actionTypes';


export const startFetching = (actionType) => ({
    type:types.START_FETCHING,
    payload:actionType
});

export const stopFetching = (actionType) => ({
    type:types.STOP_FETCHING,
    payload:actionType
});


