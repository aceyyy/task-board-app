import { combineReducers } from "redux";
import { TasksState, tasksReducer } from "./Tasks.reducers";

export interface ApplicationState {
  tasks: TasksState
};

const rootReducer = combineReducers<ApplicationState>({
  tasks: tasksReducer
});

export default rootReducer;