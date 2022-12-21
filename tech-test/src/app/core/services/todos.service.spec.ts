import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodosService } from './todos.service';
import { MOCKED_TODO_ITEMS } from 'src/app/shared/mocks';

describe('TodosService', () => {
  let service: TodosService;
  let httpController: HttpTestingController;
  let url = 'http://localhost:3000/tasks';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TodosService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getTodoList and set todo items', () => {
    service.getTodoList();

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}`,
    });
    req.flush(MOCKED_TODO_ITEMS);
  });

  it('should call updateTodoListItem and update todo items', () => {
    const updatedTodoItem = MOCKED_TODO_ITEMS[0];
    updatedTodoItem.label = 'Updated label';

    service.updateTodoListItem(updatedTodoItem);

    const req = httpController.expectOne({
      method: 'PATCH',
      url: `${url}/${updatedTodoItem.id}`,
    });
    req.flush(updatedTodoItem);
  });

  it('should call deleteTodoListItem and delete todo item by id', () => {
    const todoItem = MOCKED_TODO_ITEMS[0];

    service.deleteTodoListItem(todoItem.id);

    const req = httpController.expectOne({
      method: 'DELETE',
      url: `${url}/${todoItem.id}`,
    });
    req.flush(todoItem);
  });

  it('should call addTodoListItem and add new todo item', () => {
    const todoItem = {
      id: 3,
      label: "Go for a walk",
      description:  "",
      category: "leisure",
      done: false
    };

    service.addTodoListItem(todoItem);

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}`,
    });
    req.flush(todoItem);
  });
});
