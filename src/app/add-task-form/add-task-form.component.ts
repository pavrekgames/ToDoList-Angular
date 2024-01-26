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
    id: 1,
    taskName: '',
    taskDescription: '',
    priority: 'Wysoki',
    timeCount: 1,
    timeUnit: 'godziny',
    addTaskDate: new Date(),
    deadlineDate: new Date(),
  };

  priorityLevels: Array<string> = ['Niski', 'Średni', 'Wysoki'];
  currentPriorityLevel: string = 'Wysoki';
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
    this.currentPriorityLevel = value.target.value;

    if (this.currentPriorityLevel == 'Niski') {
      this.newTask.priority = 'Niski';
    } else if (this.currentPriorityLevel == 'Średni') {
      this.newTask.priority = 'Średni';
    } else {
      this.newTask.priority = 'Wysoki';
    }

    console.log('Changed ' + this.currentPriorityLevel);
    console.log('Select option: ' + this.currentTimeOption);
  }

  setDeadlineDate() {
    switch (this.newTask.timeUnit) {
      case 'godziny':
        this.newTask.deadlineDate = this.addHoursToDate();
        break;
      case 'dni':
        this.newTask.deadlineDate = this.addDaysToDate();
        break;
      case 'tygodnie':
        this.newTask.deadlineDate = this.addWeeksToDate();
        break;
      case 'miesiące':
        this.newTask.deadlineDate = this.addMonthsToDate();
        break;
    }
  }

  addHoursToDate(): Date {
    this.deadlineDate.setTime(
      this.newTask.addTaskDate.getTime() + this.newTask.timeCount * 60 * 60 * 1000
    );

    return this.deadlineDate;
  }

  addDaysToDate(): Date {
    this.deadlineDate.setTime(
      this.newTask.addTaskDate.getTime() + this.newTask.timeCount * 60 * 60 * 1000 * 24
    );

    return this.deadlineDate;
  }

  addWeeksToDate(): Date {
    this.deadlineDate.setTime(
      this.newTask.addTaskDate.getTime() +
      this.newTask.timeCount * 60 * 60 * 1000 * 24 * 7
    );

    return this.deadlineDate;
  }

  addMonthsToDate(): Date {
    this.deadlineDate = new Date(
      this.deadlineDate.setMonth(
        this.newTask.addTaskDate.getMonth() + this.newTask.timeCount
      )
    );

    return this.deadlineDate;
  }

  onSubmit() {
    this.isFormValid =
      this.newTask.taskName.trim().length > 0 && this.newTask.taskName.trim().length <= 90 && this.timeCount > 0;

    if (this.isFormValid) {
      console.log('Submitted');
      this.setTask();
    }
  }

  setTask() {
    this.newTask.priority = this.currentPriorityLevel;
    //this.newTask.timeCount = this.timeCount;
    //this.newTask.timeUnit = this.currentTimeOption;
    this.newTask.addTaskDate = new Date();
    this.setDeadlineDate();
    this.addNewTask();
  }

  addNewTask() {
    this.tasksService.addTask(this.newTask);
  }
}
