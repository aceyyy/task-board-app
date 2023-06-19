import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Grid from '@mui/material/Grid';
import { useAppDispatch } from './redux/store/hooks';
import { fetchTasksGetApi } from './redux/actions/Tasks.actions';
import { TasksTitle } from './components/TasksTitle';
import { TasksSearch } from './components/TasksSearch';
import { TasksFilter } from './components/TasksFilter';
import { TasksItem } from './components/TasksItem';
import { TasksAddEditModal } from './components/TasksAddEditModal';
import { TasksDeleteModal } from './components/TasksDeleteModal';
import './App.css';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasksGetApi());
  }, [dispatch]);

  return (
    <div className="app-container">
      <div className="todo-container">
        <Grid container spacing={2} display="flex" alignItems="center">
          <TasksTitle />
          <TasksSearch />
          <TasksFilter />
          <TasksItem />
        </Grid>
      </div>

      {/* popup notifications */}
      <ToastContainer />

      {/* modals */}
      <TasksAddEditModal />
      <TasksDeleteModal />
    </div>
  );
};

export default App;
