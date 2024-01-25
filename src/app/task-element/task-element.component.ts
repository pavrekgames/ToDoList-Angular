import { Component, Input, ElementRef, Renderer2 } from '@angular/core';
import { Task } from '../models/task';
import { TaskDirective } from '../directives/task.directive';

@Component({
  selector: 'app-task-element',
  templateUrl: './task-element.component.html',
  styleUrl: './task-element.component.css',
})
export class TaskElementComponent {
  isDetailsHidden: boolean = true;

  private descriptionP: any;
  private startDateP: any;
  private deadlineDateP: any;

  constructor(private el: ElementRef, private renderer: Renderer2, private taskDirective: TaskDirective ) {
    this.descriptionP = renderer.createElement('p');
    this.startDateP = renderer.createElement('p');
    this.deadlineDateP = renderer.createElement('p');

  }

  ngOnInit(): void {
    this.taskDirective.getIsDetailsHidden().subscribe((data) => {
      this.isDetailsHidden = data;
    });
  }

  @Input()
  task: Task = {
    taskName: 'Default',
    taskDescription: 'kapa',
    priority: 'Wysoki',
    addTaskDate: new Date(),
    deadlineDate: new Date(),
  };

  tasksDetails() {
    if (this.isDetailsHidden) {
     // this.descriptionP.innerHTML = this.task.taskDescription;
      //this.startDateP.innerHTML = "Data dodania: " + this.task.addTaskDate.toLocaleString();
     // this.deadlineDateP.innerHTML = "Deadline: " + this.task.deadlineDate.toLocaleString();

      //this.renderer.appendChild(this.el.nativeElement, this.descriptionP);
      //this.renderer.appendChild(this.el.nativeElement, this.startDateP);
      //this.renderer.addClass(this.el.nativeElement, 'text-success');
      //this.renderer.appendChild(this.el.nativeElement, this.deadlineDateP);
      //this.renderer.addClass(this.el.nativeElement, 'text-danger');

      this.isDetailsHidden = false;
    }else{
      this.isDetailsHidden = true;
    }
  }
}
