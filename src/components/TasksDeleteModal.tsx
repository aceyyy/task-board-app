import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { fetchTasksDeleteByIdApi, setTasksModalType } from '../redux/actions/Tasks.actions';
import { selectTasksDELETEBYIDLoading, selectTasksModalData, selectTasksModalType } from '../redux/selectors/Tasks.selectors';
import { TasksModalEnum, TasksModalType, TasksObj } from '../types/tasks.types';
import { CustomButton, CustomCircularProgressForButton } from './_reusables/CustomMaterialUI';

export const TasksDeleteModal = () => {
  const dispatch = useAppDispatch();
  const tasksModalType: TasksModalType = useAppSelector(selectTasksModalType);
  const tasksModalData: TasksObj = useAppSelector(selectTasksModalData);
  const tasksDELETEBYIDLoading: boolean = useAppSelector(selectTasksDELETEBYIDLoading);

  const onCloseModal = () => {
    dispatch(setTasksModalType(TasksModalEnum.CLOSE));
  };

  const onClickSubmit = () => {
    dispatch(fetchTasksDeleteByIdApi({ id: tasksModalData._id, hideForm: () => onCloseModal() }))
  };

  return (
    <Dialog open={tasksModalType === TasksModalEnum.DELETE} maxWidth="sm" fullWidth>
      <DialogContent>
        <div className="text-align-center">
          Are you sure you want to delete <b>`{tasksModalData?.title}`</b>?
        </div>
      </DialogContent>
      <DialogActions className="tasks-todo-form-dialog-actions">
        <CustomButton onClick={onCloseModal} disabled={tasksDELETEBYIDLoading}>Cancel</CustomButton>
        <CustomButton onClick={onClickSubmit} disabled={tasksDELETEBYIDLoading}
          endIcon={tasksDELETEBYIDLoading && <CustomCircularProgressForButton />}>Submit</CustomButton>
      </DialogActions>
    </Dialog>
  )
};