// type
export type TasksStatusType = 'to do' | 'in progress' | 'done';

export type TasksPriorityType = 'low' | 'medium' | 'high';

export type SortByOrderType = 'ascending' | 'descending';

export type SortByCategoryType = 'title' | 'status' | 'priority' | 'progress';

export type TasksModalType = 'close' | 'add' | 'edit' | 'delete';

export type TasksObjPartial = Partial<Omit<TasksObj, '__id'>>;

// enum
export enum TasksStatusEnum {
  TODO = 'to do',
  IN_PROGRESS = 'in progress',
  DONE = 'done',
}

export enum TasksPriorityEnum {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum SortByOrderEnum {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}

export enum SortByCategoryEnum {
  TITLE = 'title',
  STATUS = 'status',
  PRIORITY = 'priority',
  PROGRESS = 'progress',
}

export enum TasksModalEnum {
  CLOSE = 'close',
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete',
}

// interface
export interface TasksObj {
  _id: string;
  title: string;
  priority: TasksPriorityType;
  progress: number;
  status: TasksStatusType,
  __v?: number;
}

export interface TasksModalUpdateObj {
  property: keyof TasksObj;
  value: any;
}