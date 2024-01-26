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

  private tasks: Array<Task> = new Array();
  private tasksObs = new Subject<Array<Task>>();

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

  addTask(task: Task) {
    task.id = this.tasks.length + 1;
    this.tasks.push(Object.assign({}, task));
    this.changeAddingTaskState();
    this.tasksObs.next(this.tasks);
  }

  removeTask(task: Task) {
    this.tasks = this.tasks.filter((e) => e !== task);
    this.tasksObs.next(this.tasks);
  }

  editTask(id: number, task: Task) {
    this.tasks[id] = task;
    this.changeEditingTaskState();
    this.tasksObs.next(this.tasks);
  }
}
