import { createReducer } from "@reduxjs/toolkit";
import { SortByCategoryEnum, SortByCategoryType, SortByOrderEnum, SortByOrderType, TasksModalEnum, TasksModalType, TasksObj } from "../../types/tasks.types";
import {
  fetchTasksPostApi, fetchTasksGetApi, setFilterSearch, setSortByCategory, setSortByOrder, setTasksModalType,
  setTasksModalData, fetchTasksGetByIdApi, updateTasksModalData, fetchTasksDeleteByIdApi, fetchTasksPutByIdApi
} from "../actions/Tasks.actions";

const tasksModalInitialData: TasksObj = {
  _id: '',
  title: '',
  status: 'to do',
  priority: 'low',
  progress: 0,
};

export interface TasksState {
  tasks: TasksObj[];
  tasksGETLoading: boolean;
  filterSearch: string;
  sortByCategory: SortByCategoryType;
  sortByOrder: SortByOrderType;
  tasksModalType: TasksModalType;
  tasksModalData: TasksObj;
  tasksPOSTLoading: boolean;
  tasksNewlyAdded: TasksObj[];
  tasksGETBYIDLoading: boolean;
  tasksPUTBYIDLoading: boolean;
  tasksDELETEBYIDLoading: boolean;
};

export const initialState: TasksState = {
  tasks: [],
  tasksGETLoading: false,
  filterSearch: '',
  sortByCategory: SortByCategoryEnum.TITLE,
  sortByOrder: SortByOrderEnum.ASCENDING,
  tasksModalType: TasksModalEnum.CLOSE,
  tasksModalData: tasksModalInitialData,
  tasksPOSTLoading: false,
  tasksNewlyAdded: [],
  tasksGETBYIDLoading: false,
  tasksPUTBYIDLoading: false,
  tasksDELETEBYIDLoading: false,
};

export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setFilterSearch, (state, action) => {
      state.filterSearch = action.payload;
    })
    .addCase(setSortByCategory, (state, action) => {
      state.sortByCategory = action.payload;
    })
    .addCase(setSortByOrder, (state, action) => {
      state.sortByOrder = action.payload;
    })

    .addCase(setTasksModalType, (state, action) => {
      state.tasksModalType = action.payload;

      if (action.payload === TasksModalEnum.CLOSE) {
        state.tasksModalData = tasksModalInitialData;
      }
    })
    .addCase(setTasksModalData, (state, action) => {
      state.tasksModalData = action.payload;
    })
    .addCase(updateTasksModalData, (state, action) => {
      const { property, value } = action.payload;
      state.tasksModalData = { ...state.tasksModalData, [property]: value };
    })

    .addCase(fetchTasksGetApi.pending, (state, action) => {
      state.tasksGETLoading = true;
    })
    .addCase(fetchTasksGetApi.rejected, (state, action) => {
      state.tasksGETLoading = false;
    })
    .addCase(fetchTasksGetApi.fulfilled, (state, action) => {
      state.tasksGETLoading = false;
      state.tasks = action.payload;
      state.tasksNewlyAdded = [];
    })

    .addCase(fetchTasksPostApi.pending, (state, action) => {
      state.tasksPOSTLoading = true;
    })
    .addCase(fetchTasksPostApi.rejected, (state, action) => {
      state.tasksPOSTLoading = false;
    })
    .addCase(fetchTasksPostApi.fulfilled, (state, action) => {
      state.tasksPOSTLoading = false;
      state.tasksNewlyAdded = [action.payload, ...state.tasksNewlyAdded];
    })

    .addCase(fetchTasksGetByIdApi.pending, (state, action) => {
      state.tasksGETBYIDLoading = true;
      state.tasksModalData = tasksModalInitialData;
    })
    .addCase(fetchTasksGetByIdApi.rejected, (state, action) => {
      state.tasksGETBYIDLoading = false;
    })
    .addCase(fetchTasksGetByIdApi.fulfilled, (state, action) => {
      state.tasksGETBYIDLoading = false;
      state.tasksModalData = action.payload;
    })

    .addCase(fetchTasksPutByIdApi.pending, (state, action) => {
      state.tasksPUTBYIDLoading = true;
    })
    .addCase(fetchTasksPutByIdApi.rejected, (state, action) => {
      state.tasksPUTBYIDLoading = false;
    })
    .addCase(fetchTasksPutByIdApi.fulfilled, (state, action) => {
      state.tasksPUTBYIDLoading = false;
    })

    .addCase(fetchTasksDeleteByIdApi.pending, (state, action) => {
      state.tasksDELETEBYIDLoading = true;
    })
    .addCase(fetchTasksDeleteByIdApi.rejected, (state, action) => {
      state.tasksDELETEBYIDLoading = false;
    })
    .addCase(fetchTasksDeleteByIdApi.fulfilled, (state, action) => {
      state.tasksDELETEBYIDLoading = false;
    })
});