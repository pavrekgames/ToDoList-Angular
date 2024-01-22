export interface Task{

  taskName: string;
  taskDescription: string;
  priority: Priority;
  addTaskDate: Date;
  deadlineDate: Date;


}

enum Priority{
  Low,
  Medium,
  High
}
