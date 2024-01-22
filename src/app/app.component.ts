import { Component } from '@angular/core';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [TasksService],
})
export class AppComponent {
  title = 'ToDoApp';

  constructor(private tasksService: TasksService) {}
}
