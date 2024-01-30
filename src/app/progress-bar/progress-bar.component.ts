import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css',
})

export class ProgressBarComponent {
  doneTasksCount: number = 0;
  allTasksCount: number = 0;

  isEditingTask: boolean = false;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.getToDoCount().subscribe((data) => {
      this.doneTasksCount = data;
    });

    this.tasksService.getAllTasksCount().subscribe((data) => {
      this.allTasksCount = data;
    });

    this.tasksService.getAddingTaskState().subscribe((data) => {
      this.isEditingTask = data;
    });
  }
}
