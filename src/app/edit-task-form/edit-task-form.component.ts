import { Component } from '@angular/core';
import { Console } from 'console';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Task } from '../models/task';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrl: './edit-task-form.component.css',
})

export class EditTaskFormComponent {
  isEditingTask: boolean = false;

  taskToEdit: Task = {
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
    this.taskToEdit.taskName.trim().length > 0 && this.timeCount > 0;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.getEditingTaskState().subscribe((data) => {
      this.isEditingTask = data;
    });

    this.tasksService.getTaskObs().subscribe((data) => {
      this.taskToEdit = data;
      this.currentPriorityLevel = this.taskToEdit.priority;
    });
  }

  setDeadlineDate() {
    switch (this.taskToEdit.timeUnit) {
      case 'godziny':
        this.taskToEdit.deadlineDate = this.addHoursToDate();
        break;
      case 'dni':
        this.taskToEdit.deadlineDate = this.addDaysToDate();
        break;
      case 'tygodnie':
        this.taskToEdit.deadlineDate = this.addWeeksToDate();
        break;
      case 'miesiące':
        this.taskToEdit.deadlineDate = this.addMonthsToDate();
        break;
    }
  }

  addHoursToDate(): Date {
    this.deadlineDate.setTime(
      this.taskToEdit.addTaskDate.getTime() +
        this.taskToEdit.timeCount * 60 * 60 * 1000
    );

    return this.deadlineDate;
  }

  addDaysToDate(): Date {
    this.deadlineDate.setTime(
      this.taskToEdit.addTaskDate.getTime() +
        this.taskToEdit.timeCount * 60 * 60 * 1000 * 24
    );

    return this.deadlineDate;
  }

  addWeeksToDate(): Date {
    this.deadlineDate.setTime(
      this.taskToEdit.addTaskDate.getTime() +
        this.taskToEdit.timeCount * 60 * 60 * 1000 * 24 * 7
    );

    return this.deadlineDate;
  }

  addMonthsToDate(): Date {
    this.deadlineDate = new Date(
      this.deadlineDate.setMonth(
        this.taskToEdit.addTaskDate.getMonth() + this.taskToEdit.timeCount
      )
    );

    return this.deadlineDate;
  }

  onSubmit() {
    this.isFormValid =
      this.taskToEdit.taskName.trim().length > 0 &&
      this.taskToEdit.taskName.trim().length <= 90 &&
      this.timeCount > 0;

    if (this.isFormValid) {
      this.setTask();
    }
  }

  setTask() {
    this.taskToEdit.priority = this.currentPriorityLevel;
    this.taskToEdit.addTaskDate = new Date();
    this.setDeadlineDate();
    this.editTask();
  }

  editTask() {
    this.tasksService.editTask(this.taskToEdit.id, this.taskToEdit);
  }
}
