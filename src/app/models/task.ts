export interface Task{

  id: Number;
  taskName: string;
  taskDescription: string;
  priority: string;
  addTaskDate: Date;
  deadlineDate: Date;


}

export enum TaskPriorityLevel{
  Low = 1,
  Medium = 2,
  High = 3
}
