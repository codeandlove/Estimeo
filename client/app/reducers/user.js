import { LOGIN_USER, CLEAR_USER } from "../actions/user";

import { PENDING, FULFILLED, REJECTED } from "../api/middleware";

export function user(state={}, action) {
    switch (action.type) {
        case LOGIN_USER + FULFILLED:
            return {
                current: action.payload.data,
                authorized: (Object.keys(action.payload.data).length>0 && !action.payload.data.error)
            };
            break;
        default:
            return state;
    }
}