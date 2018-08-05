import {LOAD_PROJECTS, CLEAR_PROJECTS, LOAD_PROJECT, SAVE_PROJECT} from "../actions/projects";

import { PENDING, FULFILLED, REJECTED } from "../api/middleware";

export function projects(state={}, action) {
    switch (action.type) {
        case LOAD_PROJECTS + FULFILLED:
            return {map: action.payload.data.map(child => child)};
            break;
        case LOAD_PROJECT + FULFILLED:
            return Object.assign({}, state, {current: action.payload.data});
            break;
        case SAVE_PROJECT + FULFILLED:
            return Object.assign({}, state, {current: action.payload.data.project});
            break;
        default:
            return state;
    }
}