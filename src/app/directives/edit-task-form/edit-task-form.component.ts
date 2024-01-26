import { Component } from '@angular/core';
import { Console } from 'console';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrl: './edit-task-form.component.css'
})
export class EditTaskFormComponent {

  isEditingTask: boolean = false;

  newTask: Task = {
    id: 1,
    taskName: '',
    taskDescription: '',
    priority: 'Wysoki',
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
    this.tasksService.getEditingTaskState().subscribe((data) => {
      this.isEditingTask = data;
    });

    this.newTask.taskName = '';
  }

  setPriorityLevel(value: any) {
    this.priorityLevel = value.target.value;

    if (this.priorityLevel == 1) {
      this.newTask.priority = 'Niski';
    } else if (this.priorityLevel == 2) {
      this.newTask.priority = 'Średni';
    } else {
      this.newTask.priority = 'Wysoki';
    }

    console.log('Changed ' + this.priorityLevel);
    console.log('Select option: ' + this.currentTimeOption);
  }

  setTimeCount() {
    switch (this.currentTimeOption) {
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
    this.isFormValid =
      this.newTask.taskName.trim().length > 0 && this.newTask.taskName.trim().length <= 90 && this.timeCount > 0;

    if (this.isFormValid) {
      console.log('Submitted');
      this.setTask();
    }
  }

  setTask() {
    this.newTask.addTaskDate = new Date();
    this.setTimeCount();
    this.addNewTask();
  }

  addNewTask() {
    this.tasksService.addTask(this.newTask);
  }


}
