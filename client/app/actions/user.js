import {API} from '../api/middleware';

export const CREATE_USER = 'CREATE_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const SAVE_USER = 'SAVE_USER';
export const LOAD_USER = 'LOAD_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const DELETE_USER = 'DELETE_USER';

export function clearUser() {
    return {
        TYPE: CLEAR_USER
    }
}

export function loginUser(payload, callback) {
    return {
        type: LOGIN_USER,
        [API]: {
            method: 'post',
            url: '/api/login',
            data: payload
        },
        callback: callback
    }
}


export function loadUser(userId, callback) {
    return {
        type: LOAD_USER,
        [API]: {
            method: 'get',
            url: '/api/user/'+id
        },
        callback: callback
    }
}

export function createUser(payload, callback) {
    return {
        type: CREATE_USER,
        [API]: {
            method: 'post',
            url: '/api/user/',
            data: payload
        },
        callback: callback
    }
}