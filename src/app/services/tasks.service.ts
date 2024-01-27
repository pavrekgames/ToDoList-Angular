import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private isAddingTask: boolean = false;
  private addingTaskState = new Subject<boolean>();

  private isEditingTask: boolean = false;
  private editingTaskState = new Subject<boolean>();

  private taskObs = new Subject<Task>();


  private selectedTask: Task = {
    id: 1,
    taskName: '',
    taskDescription: '',
    priority: '',
    timeCount: 1,
    timeUnit: '',
    addTaskDate: new Date(),
    deadlineDate: new Date(),
  };

  private tasks: Array<Task> = new Array();
  private toDoTasks: Array<Task> = new Array();
  private progressTasks: Array<Task> = new Array();
  private doneTasks: Array<Task> = new Array();

  private tasksObs = new Subject<Array<Task>>();
  private toDoTasksObs = new Subject<Array<Task>>();

  constructor() {}

  changeAddingTaskState() {
    if (!this.isAddingTask) {
      this.isAddingTask = true;
    } else {
      this.isAddingTask = false;
    }

    this.addingTaskState.next(this.isAddingTask);
  }

  changeEditingTaskState() {
    if (!this.isEditingTask) {
      this.isEditingTask = true;
    } else {
      this.isEditingTask = false;
    }

    this.editingTaskState.next(this.isEditingTask);
  }

  getAddingTaskState(): Observable<boolean> {
    return this.addingTaskState.asObservable();
  }

  getEditingTaskState(): Observable<boolean> {
    return this.editingTaskState.asObservable();
  }

  getTasks(): Observable<Array<Task>> {
    return this.tasksObs.asObservable();
  }

  getToDoTasks(): Observable<Array<Task>> {
    return this.toDoTasksObs.asObservable();
  }

  addTask(task: Task) {
    task.id = this.tasks.length + 1;
    this.tasks.push({...task}); //Object.assign({},
    this.toDoTasks.push({...task});
    this.tasksObs.next(this.tasks);
    this.toDoTasksObs.next(this.toDoTasks);
    this.changeAddingTaskState();

  }

  removeTask(task: Task) {
    this.tasks = this.tasks.filter((e) => e !== task);
    this.tasksObs.next(this.tasks);
  }

  startEditTask(taskId: number) {
    this.changeEditingTaskState();
    this.taskObs.next(this.tasks[taskId-1]);
  }

  getTaskObs(): Observable<Task> {
    return this.taskObs.asObservable();
  }

  editTask(id: number, task: Task) {
    this.tasks[id-1] = task;
    this.changeEditingTaskState();
    this.tasksObs.next(this.tasks);
  }
}
