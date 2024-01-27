import { Component } from '@angular/core';
import { Task } from '../models/task';
import { TasksService } from '../services/tasks.service';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-to-do-container',
  templateUrl: './to-do-container.component.html',
  styleUrl: './to-do-container.component.css',
})
export class ToDoContainerComponent {
  allTasks: Array<Task> = [];
  toDotasks: Array<Task> = [];
  progressTasks: Array<Task> = [];
  doneTasks: Array<Task> = [];
  isEditingTask: boolean = false;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe((data) => {
      this.allTasks = data;
    });

    this.tasksService.getToDoTasks().subscribe((data) => {
      this.toDotasks = data;
    });

    this.tasksService.getEditingTaskState().subscribe((data) => {
      this.isEditingTask = data;
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
