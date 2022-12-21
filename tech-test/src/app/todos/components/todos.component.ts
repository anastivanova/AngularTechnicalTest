import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodoItem } from 'src/app/core/models';
import { TodosService } from 'src/app/core/services';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  public isEditMode: boolean;
  public todoItem: ITodoItem;
  public isSelected: boolean;

  get todoList$(): Observable<ITodoItem[]> {
    return this.todosService.todoList$;
  }

  constructor(
    private todosService: TodosService
  ) {}

  ngOnInit(): void {
    this.todosService.getTodoList();
  }

  modifyTodoItem(todoItem: ITodoItem): void {
    if(todoItem.id) {
      this.todosService.updateTodoListItem(todoItem);
      this.isEditMode = false;
      this.todoItem = void 0;
      return;
    }
    this.todosService.addTodoListItem(todoItem);
  }

  onDeleteTodoItem(id: number): void {
    this.todosService.deleteTodoListItem(id);
  }

  onEditTodoItem(todoItem: ITodoItem): void {
    this.isEditMode = true;
    this.todoItem = todoItem;
  }
}
