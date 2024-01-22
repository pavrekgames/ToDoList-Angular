import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private isAddingTask: boolean = false;
  private addingTaskState = new Subject<boolean>();

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
}
