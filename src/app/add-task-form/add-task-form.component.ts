import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Console } from 'console';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.css',
})
export class AddTaskFormComponent {
  isAddingTask: boolean = false;

  taskName: string = '';
  taskDesc: string = '';
  priority: number = 0;
  timeCount: number = 0;
  deadlineDate: Date = new Date();

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.getAddingTaskState().subscribe((data) => {
      this.isAddingTask = data;
    });
  }

}
