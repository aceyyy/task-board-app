import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { setSortByCategory, setSortByOrder } from '../redux/actions/Tasks.actions';
import { selectTasksGETLoading, selectTasksSortByCategory, selectTasksSortByOrder } from '../redux/selectors/Tasks.selectors';
import { SortByCategoryEnum, SortByCategoryType, SortByOrderEnum, SortByOrderType } from '../types/tasks.types';

export const filteredCategory: SortByCategoryType[] = [SortByCategoryEnum.TITLE, SortByCategoryEnum.STATUS, SortByCategoryEnum.PRIORITY, SortByCategoryEnum.PROGRESS];

export const TasksFilter = () => {
  const dispatch = useAppDispatch();
  const tasksLoading: boolean = useAppSelector(selectTasksGETLoading);
  const tasksSortByCategory = useAppSelector(selectTasksSortByCategory);
  const tasksSortByOrder = useAppSelector(selectTasksSortByOrder);

  const onChangeSortByCategory = (e: SelectChangeEvent) => {
    dispatch(setSortByCategory(e.target.value as SortByCategoryType));
  };

  const onClickSortByOrder = (orderBy: SortByOrderType) => {
    dispatch(setSortByOrder(orderBy));
  };

  return (
    <Grid item xs={12}>
      Sort by:&nbsp;
      <Select
        value={tasksSortByCategory}
        size="small"
        onChange={onChangeSortByCategory}
        disabled={tasksLoading}
        className="tasks-filter-select"
      >
        {filteredCategory.map((value: SortByCategoryType, key: number) => {
          const capitalizedFirstChar = value.charAt(0).toUpperCase() + value.slice(1);

          return <MenuItem key={key} value={value}>{capitalizedFirstChar}</MenuItem>
        })}
      </Select>&nbsp;
      {tasksSortByOrder === SortByOrderEnum.ASCENDING ? (
        <IconButton onClick={() => onClickSortByOrder(SortByOrderEnum.DESCENDING)} disabled={tasksLoading}>
          <ArrowUpwardIcon />
        </IconButton>
      ) : (
        <IconButton onClick={() => onClickSortByOrder(SortByOrderEnum.ASCENDING)} disabled={tasksLoading}>
          <ArrowDownwardIcon />
        </IconButton>
      )}
    </Grid>
  )
};