import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isAddingTask: boolean = false;
  isEditingTask: boolean = false;

  currentButtonText: string = 'Nowe Zadanie';
  addTaskText: string = 'Nowe Zadanie';
  cancelTaskText: string = 'Anuluj dodawanie zadania';
  cancelEditTaskText: string = 'Anuluj edycję zadania';

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.getAddingTaskState().subscribe((data) => {
      this.isAddingTask = data;
      this.setButtonText();
    });

    this.tasksService.getEditingTaskState().subscribe((data) => {
      this.isEditingTask = data;
    });
  }

  changeAddingTaskState() {
    this.tasksService.changeAddingTaskState();
  }

  changeEditingTaskState() {
    this.tasksService.changeEditingTaskState();
  }

  setButtonText() {
    if (this.isAddingTask) {
      this.currentButtonText = this.cancelTaskText;
    } else {
      this.currentButtonText = this.addTaskText;
    }
  }
}
