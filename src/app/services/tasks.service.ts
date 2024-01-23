import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private isAddingTask: boolean = false;
  private addingTaskState = new Subject<boolean>();

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

  getAddingTaskState(): Observable<boolean> {
    return this.addingTaskState.asObservable();
  }

  getTasks(): Observable<Array<Task>> {
    return this.tasksObs.asObservable();
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.changeAddingTaskState();
    this.tasksObs.next(this.tasks);
  }

  removeTask(task: Task) {
    this.tasks = this.tasks.filter((e) => e !== task);
  }
}
