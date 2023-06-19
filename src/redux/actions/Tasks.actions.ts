import axios, { AxiosError } from 'axios';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { SortByCategoryType, SortByOrderType, TasksModalType, TasksModalUpdateObj, TasksObj, TasksObjPartial } from '../../types/tasks.types';
import { ResponsePayloadError } from '../../types/responses.types';
import { showErrorToast, showSuccessToast } from '../../utils/toastr';

const API_endpoint = 'https://sbc-test-api.web.app';

export const setFilterSearch = createAction<string>('tasks/set-filter-search');
export const setSortByCategory = createAction<SortByCategoryType>('tasks/set-sort-by-category');
export const setSortByOrder = createAction<SortByOrderType>('tasks/set-sort-by-order');

export const setTasksModalType = createAction<TasksModalType>('tasks/set-modal-type');
export const setTasksModalData = createAction<TasksObj>('tasks/set-modal-data');
export const updateTasksModalData = createAction<TasksModalUpdateObj>('tasks/update-modal-data');

// Get all data
export const fetchTasksGetApi = createAsyncThunk<TasksObj[], void, ResponsePayloadError>('tasks/get-api',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_endpoint}/tasks`);

      return response?.data;
    } catch (error) {
      const typeError = error as AxiosError;
      showErrorToast(typeError?.message || "Something went wrong please try again later.")
    }
  });


interface TasksPostApiParams {
  params: TasksObjPartial;
  hideForm: () => void;
};

// Create new data
export const fetchTasksPostApi = createAsyncThunk<TasksObj, TasksPostApiParams, ResponsePayloadError>('tasks/post-api',
  async ({ params, hideForm }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_endpoint}/tasks`, params);
      await hideForm();
      await showSuccessToast("You have successfully added!");

      return response?.data;
    } catch (error) {
      const typeError = error as AxiosError;
      showErrorToast(typeError?.message || "Something went wrong please try again later.")
    }
  });

// Get data by id
export const fetchTasksGetByIdApi = createAsyncThunk<TasksObj, string, ResponsePayloadError>('tasks/get-by-id-api',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_endpoint}/tasks/${id}`);

      return response?.data;
    } catch (error) {
      const typeError = error as AxiosError;
      showErrorToast(typeError?.message || "Something went wrong please try again later.")
    }
  });

interface TasksPutByIdApiParams {
  id: string;
  params: TasksObjPartial;
  hideForm: () => void;
};

// Get data by id
export const fetchTasksPutByIdApi = createAsyncThunk<TasksObj, TasksPutByIdApiParams, ResponsePayloadError>('tasks/put-by-id-api',
  async ({ id, params, hideForm }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_endpoint}/tasks/${id}`, params);
      await hideForm();
      await showSuccessToast("You have successfully edited!");
      await thunkAPI.dispatch(fetchTasksGetApi());

      return response?.data;
    } catch (error) {
      const typeError = error as AxiosError;
      showErrorToast(typeError?.message || "Something went wrong please try again later.")
    }
  });

interface TasksDeleteByIdApiParams {
  id: string;
  hideForm: () => void;
};

// Delete data by id
export const fetchTasksDeleteByIdApi = createAsyncThunk<TasksObj, TasksDeleteByIdApiParams, ResponsePayloadError>('tasks/delete-by-id-api',
  async ({ id, hideForm }, thunkAPI) => {
    try {
      const response = await axios.delete(`${API_endpoint}/tasks/${id}`);
      await hideForm();
      await showSuccessToast("You have successfully deleted!");
      await thunkAPI.dispatch(fetchTasksGetApi());

      return response?.data;
    } catch (error) {
      const typeError = error as AxiosError;
      showErrorToast(typeError?.message || "Something went wrong please try again later.")
    }
  });