import React from 'react';
import Grid from '@mui/material/Grid';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { setTasksModalType } from '../redux/actions/Tasks.actions';
import { selectTasksGETLoading } from '../redux/selectors/Tasks.selectors';
import { TasksModalEnum } from '../types/tasks.types';
import { CustomButton } from './_reusables/CustomMaterialUI';

export const TasksTitle = () => {
  const dispatch = useAppDispatch();
  const tasksLoading: boolean = useAppSelector(selectTasksGETLoading);

  const onClickAddTodo = () => {
    dispatch(setTasksModalType(TasksModalEnum.ADD));
  };

  return (
    <React.Fragment>
      <Grid item xs={6}>
        <div className="todos-label-header">Todo(s)</div>
      </Grid>
      <Grid item xs={6}>
        <CustomButton
          className="float-right"
          onClick={onClickAddTodo}
          disabled={tasksLoading}
        >
          &emsp;Add Todo&emsp;
        </CustomButton>
      </Grid>
    </React.Fragment>
  )
};