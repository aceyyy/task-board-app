import { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { setFilterSearch } from '../redux/actions/Tasks.actions';
import { selectTasksGETLoading } from '../redux/selectors/Tasks.selectors';

export const TasksSearch = () => {
  const dispatch = useAppDispatch();
  const tasksLoading: boolean = useAppSelector(selectTasksGETLoading);

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterSearch(e.target.value));
  };

  return (
    <Grid item xs={12} className="tasks-search-container">
      <TextField
        variant="outlined"
        placeholder="Search..."
        size="small"
        fullWidth
        onChange={onChangeSearch}
        disabled={tasksLoading}
      />
    </Grid>
  )
};