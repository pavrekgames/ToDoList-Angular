import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToDoContainerComponent } from './to-do-container/to-do-container.component';
import { TaskDirective } from './directives/task.directive';
import { TaskElementComponent } from './task-element/task-element.component';
import { EditTaskFormComponent } from './directives/edit-task-form/edit-task-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddTaskFormComponent,
    ToDoContainerComponent,
    TaskDirective,
    TaskElementComponent,
    EditTaskFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
