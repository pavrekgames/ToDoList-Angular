import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToDoContainerComponent } from './to-do-container/to-do-container.component';
import { TaskDirective } from './directives/task.directive';
import { TaskElementComponent } from './task-element/task-element.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { EditTaskFormComponent } from './edit-task-form/edit-task-form.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddTaskFormComponent,
    ToDoContainerComponent,
    TaskDirective,
    TaskElementComponent,
    EditTaskFormComponent,
    ProgressBarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
