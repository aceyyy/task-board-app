import React from 'react';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import { fetchTasksGetByIdApi, setTasksModalData, setTasksModalType } from '../redux/actions/Tasks.actions';
import { selectTasks, selectTasksFilterSearch, selectTasksGETLoading, selectTasksNewlyAdded, selectTasksSortByCategory, selectTasksSortByOrder } from "../redux/selectors/Tasks.selectors";
import {
  SortByCategoryType, SortByOrderEnum, SortByOrderType, TasksModalEnum, TasksObj,
  TasksPriorityEnum, TasksPriorityType, TasksStatusEnum, TasksStatusType
} from '../types/tasks.types';
import { CustomButton } from './_reusables/CustomMaterialUI';
import { filteredCategory } from './TasksFilter';

const CustomCircularProgress = (props: CircularProgressProps & { progress: number }) => {
  return (
    <Box className="tasks-progress-box-container">
      <CircularProgress
        variant="determinate"
        size={20}
        thickness={6}
        value={100}
        className="task-item-status-progress"
        {...props}
      />
      <CircularProgress
        variant="determinate"
        size={20}
        thickness={6}
        value={props?.progress}
        className="task-item-status-progress-overlay"
        {...props}
      />
    </Box>
  );
};

const renderNoDataFound = (tasksFilterSearch: string) => {
  return (
    <Grid item xs={12}>
      <h3>{tasksFilterSearch.length > 0 ? "No data available for the search criteria!" : "No data available!"}</h3>
    </Grid>
  )
};

const renderSkeletonLoading = () => {
  const skeletonItemsToDisplay = 5;

  return (
    <React.Fragment>
      {Array(skeletonItemsToDisplay).fill('').map((value, key) => {
        return (
          <Grid item xs={12} key={key}>
            <Skeleton animation="wave" height={74} width="100%" className="tasks-item-skeleton" />
          </Grid>
        )
      })}
    </React.Fragment>
  )
};

const renderPriority = (priority: TasksPriorityType) => {
  switch (priority) {
    case TasksPriorityEnum.LOW:
      return <span className="task-item-priority-low">Low</span>;
    case TasksPriorityEnum.MEDIUM:
      return <span className="task-item-priority-medium">Medium</span>;
    case TasksPriorityEnum.HIGH:
      return <span className="task-item-priority-high">High</span>;
    default:
      return null;
  }
};

const renderStatus = (status: TasksStatusType) => {
  switch (status) {
    case TasksStatusEnum.TODO:
      return <span className="task-item-status-todo">To Do</span>;
    case TasksStatusEnum.IN_PROGRESS:
      return <span className="task-item-status-in-progress">In Progress</span>;
    case TasksStatusEnum.DONE:
      return <span className="task-item-status-done">Done</span>;
    default:
      return null;
  }
};

export const TasksItem = () => {
  const dispatch = useAppDispatch();
  const tasks: TasksObj[] = useAppSelector(selectTasks);
  const tasksLoading: boolean = useAppSelector(selectTasksGETLoading);
  const tasksFilterSearch: string = useAppSelector(selectTasksFilterSearch);
  const tasksSortByCategory: SortByCategoryType = useAppSelector(selectTasksSortByCategory);
  const tasksSortByOrder: SortByOrderType = useAppSelector(selectTasksSortByOrder);
  const tasksNewlyAdded: TasksObj[] = useAppSelector(selectTasksNewlyAdded);

  const sortedTasksByCategoryAscendingOrder: TasksObj[] = [...tasks].sort((a: TasksObj, b: TasksObj) => a[tasksSortByCategory] > b[tasksSortByCategory] ? 1 : -1);
  const sortedTasksByCategoryDescendingOrder: TasksObj[] = [...tasks].sort((a: TasksObj, b: TasksObj) => b[tasksSortByCategory] > a[tasksSortByCategory] ? 1 : -1);

  const tasksSortedOnly: TasksObj[] = tasksSortByOrder === SortByOrderEnum.ASCENDING ? sortedTasksByCategoryAscendingOrder : sortedTasksByCategoryDescendingOrder;
  const taskFilteredSearch: TasksObj[] = tasksSortedOnly.filter(value =>
    filteredCategory.some(value2 =>
      value[value2].toString().toLowerCase().indexOf(tasksFilterSearch.toLocaleLowerCase()) > -1
    )
  );

  const tasksData = tasksFilterSearch === '' ? tasksSortedOnly : taskFilteredSearch;
  const tasksDataWithNewlyAdded = [...tasksNewlyAdded, ...tasksData];

  const onClickDelete = (data: TasksObj) => {
    dispatch(setTasksModalType(TasksModalEnum.DELETE));
    dispatch(setTasksModalData(data));
  };

  const onClickEdit = (data: TasksObj) => {
    dispatch(setTasksModalType(TasksModalEnum.EDIT));
    dispatch(fetchTasksGetByIdApi(data._id));
  };

  return (
    <Grid item xs={12}>
      <Grid container rowSpacing={0.5}>
        {tasksLoading ? renderSkeletonLoading() : (
          <React.Fragment>
            {tasksDataWithNewlyAdded.length <= 0 ? renderNoDataFound(tasksFilterSearch) :
              tasksDataWithNewlyAdded.map((value: TasksObj, key: number) => {
                return (
                  <Grid item xs={12} key={key}>
                    <Paper variant="outlined" className="tasks-item-container">
                      <Grid container spacing={2} display="flex" alignItems="center">
                        <Grid item xs={6} sm={3}>
                          <div className="task-item-gray-text">Todo</div>
                          <div className="task-item-title">{value?.title}</div>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <div className="task-item-gray-text">Priority</div>
                          <div>{renderPriority(value?.priority)}</div>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                          <CustomButton size="medium" className="task-item-status-button task-item-status-todo" disabled>
                            {renderStatus(value?.status)}
                          </CustomButton>
                        </Grid>
                        <Grid item xs={3} sm={1}>
                          <CustomCircularProgress progress={value?.progress} />
                        </Grid>
                        <Grid item xs={3} sm={2} className="tasks-item-paper-grid-center">
                          <IconButton onClick={() => onClickEdit(value)}>
                            <EditIcon className="task-item-actions-icon task-item-actions-button-edit" />
                          </IconButton>
                          <IconButton onClick={() => onClickDelete(value)}>
                            <DeleteIcon className="task-item-actions-icon task-item-actions-button-delete" />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                )
              })}
          </React.Fragment>
        )}
      </Grid>
    </Grid>
  )
};