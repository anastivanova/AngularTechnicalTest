import { MOCKED_TODO_ITEMS } from './mocked-todo-items';
import { Observable, of } from 'rxjs';
import { ITodoItem } from 'src/app/core/models';

export class MockedTodoService {
  public get todoList$(): Observable<ITodoItem[]> {
    return of(MOCKED_TODO_ITEMS);
  }

  getTodoList() {}
  addTodoListItem(todoListItem: ITodoItem){}
  updateTodoListItem(todoListItem: ITodoItem){}
  deleteTodoListItem(id: number){}
}
