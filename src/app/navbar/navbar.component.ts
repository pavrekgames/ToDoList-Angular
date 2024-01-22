import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isAddingTask: boolean = false;

  navbarTaskButton() {
    if (!this.isAddingTask) {
      this.isAddingTask = true;
    } else {
      this.isAddingTask = false;
    }
  }
}
