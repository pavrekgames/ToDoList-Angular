import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isAddingTask: boolean = false;
  currentButtonText: string = "Nowe Zadanie";
  addTaskText: string = "Nowe Zadanie";
  cancelTaskText: string = "Anuluj dodawanie zadania";

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.getAddingTaskState().subscribe((data) => {
      this.isAddingTask = data;
      this.setButtonText();
    });
  }

  changeAddingTaskState() {
    this.tasksService.changeAddingTaskState();
  }

setButtonText(){
  if(this.isAddingTask){
    this.currentButtonText = this.cancelTaskText;
  }else{
    this.currentButtonText = this.addTaskText;
  }
}

}
