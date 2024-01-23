import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Console } from 'console';
import { TaskPriorityLevel, Task } from '../models/task';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

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
  timeCount: number = 1;
  timeOptions: Array<string> = ['godziny', 'dni', 'tygodnie', 'miesiące'];
  currentTimeOption: string = 'godziny';

  deadlineDate: Date = new Date();

  isFormValid: boolean =
    this.newTask.taskName.trim().length > 0 && this.timeCount > 0;

  constructor(
    private tasksService: TasksService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.tasksService.getAddingTaskState().subscribe((data) => {
      this.isAddingTask = data;
    });

    this.newTask.taskName = '';
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

  onSubmit() {

    this.isFormValid = this.newTask.taskName.trim().length > 0 && this.timeCount > 0;

    if (this.isFormValid) {
      console.log('Submitted');
    }
  }

  addNewTask() {
    this.tasksService.addTask(this.newTask);
  }
}
