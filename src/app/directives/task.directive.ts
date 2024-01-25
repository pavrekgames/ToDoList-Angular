import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { Task } from '../models/task';
import { Observable, Subject } from 'rxjs';

@Directive({
  selector: '[appTask]',
})
export class TaskDirective {

  isDetailsHidden: boolean = false;
  isDetailsHiddenObs = new Subject<boolean>();

  constructor() {
  }


  @HostListener('mouseleave')
  mouseLeave() {

    this.isDetailsHidden = true;
    this.isDetailsHiddenObs.next(this.isDetailsHidden);

  }

  getIsDetailsHidden(): Observable<boolean> {
    return this.isDetailsHiddenObs.asObservable();
  }
}
