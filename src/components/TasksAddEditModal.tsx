import { ChangeEvent } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import LinearProgress from '@mui/material/LinearProgress';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { fetchTasksPostApi, fetchTasksPutByIdApi, setTasksModalType, updateTasksModalData } from '../redux/actions/Tasks.actions';
import { selectTasksGETBYIDLoading, selectTasksModalData, selectTasksModalType, selectTasksPOSTLoading, selectTasksPUTBYIDLoading } from '../redux/selectors/Tasks.selectors';
import { TasksModalEnum, TasksModalType, TasksObj, TasksPriorityType, TasksStatusType } from '../types/tasks.types';
import ControlledTextField from './_reusables/ControlledTextField';
import { CustomButton, CustomCircularProgressForButton } from './_reusables/CustomMaterialUI';

const priorityList: TasksPriorityType[] = ['low', 'medium', "high"];

const statusList: TasksStatusType[] = ['to do', 'in progress', 'done'];

export const TasksAddEditModal = () => {
  const dispatch = useAppDispatch();
  const tasksModalType: TasksModalType = useAppSelector(selectTasksModalType);
  const tasksModalData: TasksObj = useAppSelector(selectTasksModalData);
  const tasksGETBYIDLoading: boolean = useAppSelector(selectTasksGETBYIDLoading);
  const tasksPOSTLoading: boolean = useAppSelector(selectTasksPOSTLoading);
  const tasksPUTBYIDLoading: boolean = useAppSelector(selectTasksPUTBYIDLoading);

  const form = useForm({
    defaultValues: {
      title: "",
    },
  });

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>, property: keyof TasksObj) => {
    dispatch(updateTasksModalData({ property, value: e.target.value }));
    form.setValue("title", e.target.value);
  };

  const onChangeSelect = (e: SelectChangeEvent, property: keyof TasksObj) => {
    dispatch(updateTasksModalData({ property, value: e.target.value }));
  };

  const onChangeSlider = (e: Event, newValue: number | number[], property: keyof TasksObj) => {
    dispatch(updateTasksModalData({ property, value: newValue }));
  };

  const onCloseModal = () => {
    dispatch(setTasksModalType(TasksModalEnum.CLOSE));
    form.reset();
  };

  const onSubmit = () => {
    const params = {
      title: tasksModalData.title,
      status: tasksModalData.status,
      priority: tasksModalData.priority,
      progress: tasksModalData.progress,
    };

    if (tasksModalType === TasksModalEnum.ADD) {
      dispatch(fetchTasksPostApi({ params, hideForm: () => onCloseModal() }));
    } else {
      dispatch(fetchTasksPutByIdApi({ id: tasksModalData._id, params, hideForm: () => onCloseModal() }));
    }
  };

  const isAddModal = tasksModalType === TasksModalEnum.ADD;
  const openDialog = ([TasksModalEnum.ADD, TasksModalEnum.EDIT] as TasksModalType[]).includes(tasksModalType);

  return (
    <Dialog
      open={openDialog}
      maxWidth="sm"
      fullWidth
    >
      {!isAddModal && tasksGETBYIDLoading && <LinearProgress />}
      <DialogTitle><span className="todos-label-header">{isAddModal ? "Add" : "Edit"} Todo Form</span></DialogTitle>
      <DialogContent>
        <FormProvider {...form}>
          <div className="tasks-todo-form-container">
            <div>Title:</div>
            <div>
              <ControlledTextField
                name="title"
                value={tasksModalData?.title}
                rules={{ required: "This field is required" }}
                onChange={(e) => onChangeInput(e as ChangeEvent<HTMLInputElement>, "title")}
                disabled={tasksGETBYIDLoading}
              />
            </div>
            <div>Priority:</div>
            <div>
              <Select
                name="priority"
                value={tasksModalData?.priority}
                size="small"
                onChange={(e) => onChangeSelect(e as SelectChangeEvent, "priority")}
                fullWidth
                disabled={tasksGETBYIDLoading}
              >
                {priorityList.map((value: TasksPriorityType, key: number) => {
                  const capitalizedFirstChar = value.charAt(0).toUpperCase() + value.slice(1);

                  return <MenuItem key={key} value={value}>{capitalizedFirstChar}</MenuItem>
                })}
              </Select>
            </div>

            <div>Status:</div>
            <div>
              <Select
                name="status"
                value={tasksModalData?.status}
                size="small"
                onChange={(e) => onChangeSelect(e as SelectChangeEvent, "status")}
                fullWidth
                disabled={tasksGETBYIDLoading}
              >
                {statusList.map((value: TasksStatusType, key: number) => {
                  const capitalizedFirstChar = value.charAt(0).toUpperCase() + value.slice(1);

                  return <MenuItem key={key} value={value}>{capitalizedFirstChar}</MenuItem>
                })}
              </Select>
            </div>

            <div>Progress:</div>
            <div className="tasks-todo-form-progress-container">
              <Slider
                name="progress"
                value={tasksModalData?.progress}
                valueLabelDisplay="auto"
                onChange={(e, newValue) => onChangeSlider(e as Event, newValue as number | number[], "progress")}
                disabled={tasksGETBYIDLoading}
              />
            </div>
          </div>
        </FormProvider>
      </DialogContent>
      <DialogActions className="tasks-todo-form-dialog-actions">
        <CustomButton onClick={onCloseModal} disabled={tasksGETBYIDLoading || tasksPOSTLoading || tasksPUTBYIDLoading}>Cancel</CustomButton>
        <CustomButton onClick={form.handleSubmit(onSubmit)} disabled={tasksGETBYIDLoading || tasksPOSTLoading || tasksPUTBYIDLoading}
          endIcon={(tasksPOSTLoading || tasksPUTBYIDLoading) && <CustomCircularProgressForButton />}>Submit</CustomButton>
      </DialogActions>
    </Dialog>
  )
};