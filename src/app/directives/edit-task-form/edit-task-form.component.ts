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

  taskToEdit: Task = {
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
    this.taskToEdit.taskName.trim().length > 0 && this.timeCount > 0;

  constructor(
    private tasksService: TasksService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.tasksService.getEditingTaskState().subscribe((data) => {
      this.isEditingTask = data;
    });

    this.tasksService.getTaskObs().subscribe((data) => {
      this.taskToEdit = data;
    });

    this.taskToEdit.taskName = '';
  }

  setPriorityLevel(value: any) {
    this.priorityLevel = value.target.value;

    if (this.priorityLevel == 1) {
      this.taskToEdit.priority = 'Niski';
    } else if (this.priorityLevel == 2) {
      this.taskToEdit.priority = 'Średni';
    } else {
      this.taskToEdit.priority = 'Wysoki';
    }

    console.log('Changed ' + this.priorityLevel);
    console.log('Select option: ' + this.currentTimeOption);
  }

  setTimeCount() {
    switch (this.currentTimeOption) {
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
      this.taskToEdit.addTaskDate.getTime() + this.timeCount * 60 * 60 * 1000
    );

    return this.deadlineDate;
  }

  addDaysToDate(): Date {
    this.deadlineDate.setTime(
      this.taskToEdit.addTaskDate.getTime() + this.timeCount * 60 * 60 * 1000 * 24
    );

    return this.deadlineDate;
  }

  addWeeksToDate(): Date {
    this.deadlineDate.setTime(
      this.taskToEdit.addTaskDate.getTime() +
        this.timeCount * 60 * 60 * 1000 * 24 * 7
    );

    return this.deadlineDate;
  }

  addMonthsToDate(): Date {
    this.deadlineDate = new Date(
      this.deadlineDate.setMonth(
        this.taskToEdit.addTaskDate.getMonth() + this.timeCount
      )
    );

    return this.deadlineDate;
  }

  onSubmit() {
    this.isFormValid =
      this.taskToEdit.taskName.trim().length > 0 && this.taskToEdit.taskName.trim().length <= 90 && this.timeCount > 0;

    if (this.isFormValid) {
      console.log('Submitted');
      this.setTask();
    }
  }

  setTask() {
    this.taskToEdit.addTaskDate = new Date();
    this.setTimeCount();
    this.editTask();
  }

  editTask() {
    this.tasksService.editTask(this.taskToEdit.id, this.taskToEdit);
  }


}
