import { Component } from '@angular/core';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.css'
})
export class AddTaskFormComponent {

taskName: string = "";
taskDesc: string = "";
priority: number = 0;
timeCount: number = 0;
deadlineDate: Date = new Date();

}
