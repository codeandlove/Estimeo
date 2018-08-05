import { LOAD_TASKS, CLEAR_TASKS, LOAD_TASK, SAVE_TASK, LOAD_PROJECT_TASKS } from "../actions/tasks";

import { PENDING, FULFILLED, REJECTED } from "../api/middleware";

export function tasks(state={}, action) {
    switch (action.type) {
        case LOAD_TASKS + FULFILLED:
            return {map: action.payload.data.map(child => child)};
            break;
        case LOAD_TASK + FULFILLED:
            if(!!state.current) {
                return {current: [...state.current, action.payload.data]};
            } else {
                return {current: [action.payload.data]};
            }

            break;
        case LOAD_PROJECT_TASKS + FULFILLED:
            return {current: action.payload.data};
            break;
        case SAVE_TASK + FULFILLED:

            //Find and replace in current tasks
            const _id = action.payload.data.task._id;

            //Is there this task exist in projects tasks already?
            let index = -1;

            [...state.current].filter((task, i) => {
                if(task._id === _id) {
                    index = i;
                }
            });

            if(index > -1) {
                //Replace existing task to received one
                return {
                    current: [...state.current.slice(0,index), action.payload.data.task , ...state.current.slice(index+1)]

                }
            } else {
                //Save new just created task
                return {current: [...state.current, action.payload.data.task]};
            }

            //return {current: result};

            break;
        default:
            return state;
    }
}