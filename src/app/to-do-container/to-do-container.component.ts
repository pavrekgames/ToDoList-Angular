import { Component } from '@angular/core';
import { Task } from '../models/task';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-to-do-container',
  templateUrl: './to-do-container.component.html',
  styleUrl: './to-do-container.component.css',
})
export class ToDoContainerComponent {
  tasks: Array<Task> = [];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }
}
