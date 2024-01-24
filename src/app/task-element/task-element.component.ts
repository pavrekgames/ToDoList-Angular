import { Component, Input, ElementRef, Renderer2 } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-element',
  templateUrl: './task-element.component.html',
  styleUrl: './task-element.component.css',
})
export class TaskElementComponent {
  isShowingDetails: boolean = false;

  private descriptionP: any;
  private startDateP: any;
  private deadlineDateP: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.descriptionP = renderer.createElement('p');
    this.startDateP = renderer.createElement('p');
    this.deadlineDateP = renderer.createElement('p');
  }

  @Input()
  task: Task = {
    taskName: 'Default',
    taskDescription: 'kapa',
    priority: 'Wysoki',
    addTaskDate: new Date(),
    deadlineDate: new Date(),
  };

  showTasksDetails() {
    if (!this.isShowingDetails) {
      this.descriptionP.innerHTML = this.task.taskDescription;
      this.startDateP.innerHTML = this.task.addTaskDate.toLocaleString();
      this.deadlineDateP.innerHTML = this.task.deadlineDate.toLocaleString();

      this.renderer.appendChild(this.el.nativeElement, this.descriptionP);
      this.renderer.appendChild(this.el.nativeElement, this.startDateP);
      this.renderer.appendChild(this.el.nativeElement, this.deadlineDateP);

      this.isShowingDetails = true;
    }
  }
}
