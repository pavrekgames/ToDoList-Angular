import { Component, Input, ElementRef, Renderer2 } from '@angular/core';
import { Task } from '../models/task';
import { TaskDirective } from '../directives/task.directive';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-task-element',
  templateUrl: './task-element.component.html',
  styleUrl: './task-element.component.css',
})
export class TaskElementComponent {
  isDetailsHidden: boolean = true;
  isSettingsHidden: boolean = true;

  constructor(
    private taskDirective: TaskDirective,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    this.taskDirective.getIsDetailsHidden().subscribe((data) => {
      this.isDetailsHidden = data;
      this.isSettingsHidden = data;
    });
  }

  @Input()
  task: Task = {
    id: 1,
    taskName: 'Default',
    taskDescription: 'kapa',
    priority: 'Wysoki',
    addTaskDate: new Date(),
    deadlineDate: new Date(),
  };

  tasksDetails() {
    if (this.isDetailsHidden) {
      this.isDetailsHidden = false;
    } else {
      this.isDetailsHidden = true;
    }
  }

  tasksSettings() {
    if (this.isSettingsHidden) {
      this.isSettingsHidden = false;
    } else {
      this.isSettingsHidden = true;
    }
  }

  removeTask() {
    this.tasksService.removeTask(this.task);

    console.log('Remove Task');
  }

  editTask() {
    this.tasksService.startEditTask(this.task.id);

    console.log('Task id: ' + this.task.id);
  }
}
