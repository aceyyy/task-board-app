import { SortByCategoryType, SortByOrderType, TasksModalType, TasksObj } from "../../types/tasks.types";
import { RootState } from "../store/store";

export const selectTasks: (state: RootState) => TasksObj[] = (state) => state.tasks?.tasks || [];

export const selectTasksGETLoading: (state: RootState) => boolean = (state) => state.tasks?.tasksGETLoading;

export const selectTasksFilterSearch: (state: RootState) => string = (state) => state.tasks?.filterSearch;

export const selectTasksSortByCategory: (state: RootState) => SortByCategoryType = (state) => state.tasks?.sortByCategory;

export const selectTasksSortByOrder: (state: RootState) => SortByOrderType = (state) => state.tasks?.sortByOrder;

export const selectTasksModalType: (state: RootState) => TasksModalType = (state) => state.tasks?.tasksModalType;

export const selectTasksModalData: (state: RootState) => TasksObj = (state) => state.tasks?.tasksModalData;

export const selectTasksPOSTLoading: (state: RootState) => boolean = (state) => state.tasks?.tasksPOSTLoading;

export const selectTasksNewlyAdded: (state: RootState) => TasksObj[] = (state) => state.tasks?.tasksNewlyAdded;

export const selectTasksGETBYIDLoading: (state: RootState) => boolean = (state) => state.tasks?.tasksGETBYIDLoading;

export const selectTasksPUTBYIDLoading: (state: RootState) => boolean = (state) => state.tasks?.tasksPUTBYIDLoading;

export const selectTasksDELETEBYIDLoading: (state: RootState) => boolean = (state) => state.tasks?.tasksDELETEBYIDLoading;
