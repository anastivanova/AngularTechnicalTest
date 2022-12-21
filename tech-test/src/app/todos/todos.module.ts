import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './components/todos.component';
import { SharedModule } from '../shared/shared.module';
import { ModifyTodoListComponent } from './components/modify-todo-list/modify-todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';


@NgModule({
  declarations: [
    TodosComponent,
    ModifyTodoListComponent,
    TodoItemComponent
  ],
  imports: [
    TodosRoutingModule,
    SharedModule
  ]
})
export class TodosModule { }
