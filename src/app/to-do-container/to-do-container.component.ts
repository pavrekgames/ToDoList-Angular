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

  dropToDo(event: CdkDragDrop<Task[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    this.toDotasks = event.container.data;

    this.tasksService.updateTasksLists(
      this.toDotasks,
      this.progressTasks,
      this.doneTasks
    );
  }

  dropInProgress(event: CdkDragDrop<Task[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    this.progressTasks = event.container.data;

    this.tasksService.updateTasksLists(
      this.toDotasks,
      this.progressTasks,
      this.doneTasks
    );
  }

  dropDone(event: CdkDragDrop<Task[]>) {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    this.doneTasks = event.container.data;

    this.tasksService.updateTasksLists(
      this.toDotasks,
      this.progressTasks,
      this.doneTasks
    );
  }

  removeTask(task: Task) {
    this.toDotasks = this.toDotasks.filter((e) => e !== task);
    this.progressTasks = this.progressTasks.filter((e) => e !== task);
    this.doneTasks = this.doneTasks.filter((e) => e !== task);
  }
}
