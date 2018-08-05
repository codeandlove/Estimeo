import {API} from '../api/middleware';

export const CREATE_PROJECT = 'CREATE_PROJECT';
export const SAVE_PROJECT = 'SAVE_PROJECT';
export const LOAD_PROJECTS = 'LOAD_PROJECTS';
export const LOAD_PROJECT = 'LOAD_PROJECT';
export const CLEAR_PROJECTS = 'CLEAR_PROJECTS';
export const DELETE_PROJECT = 'DELETE_PROJECT';

export function clearProjects() {
    return {
        TYPE: CLEAR_PROJECTS
    }
}

export function loadProjects(callback) {
    return {
        type: LOAD_PROJECTS,
        [API]: {
            method: 'get',
            url: '/api/projects'
        },
        callback: callback
    }
}

export function createProject(payload, callback) {
    return {
        type: CREATE_PROJECT,
        [API]: {
            method: 'post',
            url: '/api/project',
            data: payload
        },
        callback: callback
    }
}

export function deleteProject(id, callback) {
    return {
        type: DELETE_PROJECT,
        [API]: {
            method: 'delete',
            url: '/api/project/delete/'+id
        },
        callback: callback
    }
}

export function saveProject(id, payload, callback) {
    return {
        type: SAVE_PROJECT,
        [API]: {
            method: 'put',
            url: '/api/project/save/'+id,
            data: payload
        },
        callback: callback
    }
}

export function loadProject(id, callback) {
    return {
        type: LOAD_PROJECT,
        [API]: {
            method: 'get',
            url: '/api/project/'+id
        },
        callback: callback
    }
}
