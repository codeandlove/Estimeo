import {API} from '../api/middleware';

export const CREATE_TASK = 'CREATE_TASK';
export const SAVE_TASK = 'SAVE_TASK';
export const LOAD_TASKS = 'LOAD_TASKS';
export const LOAD_TASK = 'LOAD_TASK';
export const CLEAR_TASKS = 'CLEAR_TASKS';
export const DELETE_TASK = 'DELETE_TASK';
export const LOAD_PROJECT_TASKS = 'LOAD_PROJECT_TASKS';

export function clearTasks() {
    return {
        TYPE: CLEAR_TASKS
    }
}

export function loadAllTasks(callback) {
    return {
        type: LOAD_TASKS,
        [API]: {
            method: 'get',
            url: '/api/tasks'
        },
        callback: callback
    }
}

export function createTask(payload, callback) {
    return {
        type: CREATE_TASK,
        [API]: {
            method: 'post',
            url: '/api/task',
            data: payload
        },
        callback: callback
    }
}

export function deleteTask(id, callback) {
    return {
        type: DELETE_TASK,
        [API]: {
            method: 'delete',
            url: '/api/task/delete/'+id
        },
        callback: callback
    }
}

export function saveTask(id, payload, callback) {
    return {
        type: SAVE_TASK,
        [API]: {
            method: 'put',
            url: '/api/task/save/'+id,
            data: payload
        },
        callback: callback
    }
}

export function loadTask(id, callback) {
    return {
        type: LOAD_TASK,
        [API]: {
            method: 'get',
            url: '/api/task/'+id
        },
        callback: callback
    }
}

export function loadProjectTasks(id, callback) {
    return {
        type: LOAD_PROJECT_TASKS,
        [API]: {
            method: 'get',
            url: '/api/project/'+id+'/tasks'
        },
        callback: callback
    }
}
