import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private taskId: number = 0;

  private toDoTasksCount = 0;
  private toDoCountObs = new Subject<number>();
  private allTasksCount = 0;
  private allTasksCountObs = new Subject<number>();

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


  updateTasksLists(
    toDoArray: Array<Task>,
    progressArray: Array<Task>,
    doneArray: Array<Task>
  ) {
    this.toDoTasks = toDoArray;
    this.progressTasks = progressArray;
    this.doneTasks = doneArray;

    this.setTasksList();
    this.calculateProgress();
  }

  addTask(task: Task) {
    this.taskId++;
    task.id = this.taskId;
    this.tasks.push(Object.assign({}, task)); //Object.assign({}, { ...task}
    this.toDoTasks.push(Object.assign({}, task));
    this.tasksObs.next(this.tasks);
    this.toDoTasksObs.next(this.toDoTasks);
    this.changeAddingTaskState();

    this.setTasksList();
    this.calculateProgress();
  }

  removeTask(task: Task) {
    console.log(task);

    this.toDoTasks = this.tasks.filter((e) => e.id !== task.id);
    this.progressTasks = this.tasks.filter((e) => e.id !== task.id);
    this.doneTasks = this.tasks.filter((e) => e.id !== task.id);

    this.setTasksList();
    this.calculateProgress();
    this.tasksObs.next(this.tasks);

    console.log(this.tasks);
  }

  startEditTask(taskId: number) {
    this.changeEditingTaskState();
    this.taskObs.next(this.tasks[taskId - 1]);
  }

  editTask(id: number, task: Task) {
    this.tasks[id - 1] = task;
    this.changeEditingTaskState();
    this.tasksObs.next(this.tasks);
  }

  setTasksList() {
    this.tasks = [];
    this.tasks = this.tasks.concat(
      this.toDoTasks,
      this.progressTasks,
      this.doneTasks
    );
  }

  calculateProgress() {
    this.toDoTasksCount = this.doneTasks.length;
    this.allTasksCount = this.toDoTasks.length + this.progressTasks.length + this.doneTasks.length;
    this.toDoCountObs.next(this.toDoTasksCount);
    this.allTasksCountObs.next(this.allTasksCount);
  }

  getTaskObs(): Observable<Task> {
    return this.taskObs.asObservable();
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

  getToDoCount(): Observable<number> {
    return this.toDoCountObs.asObservable();
  }

  getAllTasksCount(): Observable<number> {
    return this.allTasksCountObs.asObservable();
  }

}
