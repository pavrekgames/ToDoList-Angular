import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Console } from 'console';
import { TaskPriorityLevel, Task } from '../models/task';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.css',
})
export class AddTaskFormComponent {
  isAddingTask: boolean = false;

  newTask: Task = {
    taskName: '',
    taskDescription: '',
    priority: TaskPriorityLevel.High,
    addTaskDate: new Date(),
    deadlineDate: new Date(),
  };

  priorityLevel: Number = 1;
  timeCount: number = 0;
  timeOptions: Array<string> = ['godziny', 'dni', 'tygodnie', 'miesiące'];
  currentTimeOption: string = 'godziny';

  deadlineDate: Date = new Date();

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.getAddingTaskState().subscribe((data) => {
      this.isAddingTask = data;
    });
  }

  setPriorityLevel(value: any) {
    this.priorityLevel = value.target.value;

    if (this.priorityLevel == 1) {
      this.newTask.priority = TaskPriorityLevel.Low;
    } else if (this.priorityLevel == 2) {
      this.newTask.priority = TaskPriorityLevel.Medium;
    } else {
      this.newTask.priority = TaskPriorityLevel.High;
    }

    console.log('Changed ' + this.priorityLevel);
    console.log('Select option: ' + this.currentTimeOption);
  }

  addHoursToDate(): Date {
    this.deadlineDate.setTime(
      this.newTask.addTaskDate.getTime() + this.timeCount * 60 * 60 * 1000
    );

    return this.deadlineDate;
  }

  addDaysToDate(): Date {
    this.deadlineDate.setTime(
      this.newTask.addTaskDate.getTime() + this.timeCount * 60 * 60 * 1000 * 24
    );

    return this.deadlineDate;
  }

  addWeeksToDate(): Date {
    this.deadlineDate.setTime(
      this.newTask.addTaskDate.getTime() +
        this.timeCount * 60 * 60 * 1000 * 24 * 7
    );

    return this.deadlineDate;
  }

  addMonthsToDate(): Date {
    this.deadlineDate = new Date(
      this.deadlineDate.setMonth(
        this.newTask.addTaskDate.getMonth() + this.timeCount
      )
    );

    return this.deadlineDate;
  }

  addNewTask() {
    this.tasksService.addTask(this.newTask);
  }
}
