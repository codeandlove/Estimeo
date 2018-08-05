import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { request } from '../api/middleware';

import { projects } from "./projects";
import { tasks } from "./tasks";
import { user } from "./user";

const rootReducer = combineReducers({
  request,
  projects,
  tasks,
  user,
  routing: routerReducer
});

export default rootReducer;
