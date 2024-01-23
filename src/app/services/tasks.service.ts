import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private isAddingTask: boolean = false;
  private addingTaskState = new Subject<boolean>();

  tasks: Array<Task> = new Array();

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

  addTask(task: Task) {
    this.tasks.push(task);
  }

  removeTask(task: Task) {
    this.tasks = this.tasks.filter((e) => e !== task);
  }
}
