import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { Task } from '../models/task';

@Directive({
  selector: '[appTask]',
})
export class TaskDirective {
  @Input()
  task: Task = {
    taskName: '',
    taskDescription: '',
    priority: 'Wysoki',
    addTaskDate: new Date(),
    deadlineDate: new Date(),
  };

  isShowingDetails: boolean = false;

  private descriptionP: any;
  private startDateP: any;
  private deadlineDateP: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.descriptionP = renderer.createElement('p');
    this.startDateP = renderer.createElement('p');
    this.deadlineDateP = renderer.createElement('p');
  }

  @HostListener('click') showTaskDetails(){
    if (!this.isShowingDetails) {
      this.descriptionP.innerHTML = this.task.taskDescription;
      this.startDateP.innerHTML = this.task.addTaskDate;
      this.deadlineDateP.innerHTML = this.task.deadlineDate;

      this.renderer.appendChild(this.el.nativeElement, this.descriptionP);
      this.renderer.appendChild(this.el.nativeElement, this.startDateP);
      this.renderer.appendChild(this.el.nativeElement, this.deadlineDateP);

      this.isShowingDetails = true;
    }
}
  showTaskDetails2() {

  }

  @HostListener('mouseleave')
  mouseLeave() {
    if(this.isShowingDetails){
      this.renderer.removeChild(this.el.nativeElement, this.descriptionP);
      this.renderer.removeChild(this.el.nativeElement, this.startDateP);
      this.renderer.removeChild(this.el.nativeElement, this.deadlineDateP);

      this.isShowingDetails = false;
    }
  }
}