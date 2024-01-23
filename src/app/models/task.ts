export interface Task{

  taskName: string;
  taskDescription: string;
  priority: TaskPriorityLevel;
  addTaskDate: Date;
  deadlineDate: Date;


}

export enum TaskPriorityLevel{
  Low = 1,
  Medium = 2,
  High = 3
}
