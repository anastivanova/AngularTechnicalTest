import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodosService } from 'src/app/core/services';
import { SharedModule } from 'src/app/shared/shared.module';
import { MockedTodoService, MOCKED_TODO_ITEMS } from 'src/app/shared/mocks';
import { TodosComponent } from './todos.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { ModifyTodoListComponent } from './modify-todo-list/modify-todo-list.component';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, BrowserAnimationsModule, SharedModule ],
      declarations: [ TodosComponent, TodoItemComponent, ModifyTodoListComponent ],
      providers: [{ provide: TodosService, useClass: MockedTodoService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should receive correct todo items', (done: DoneFn) => {
    component.todoList$.subscribe((todoItems) => {
      expect(todoItems).toEqual(MOCKED_TODO_ITEMS);
      done();
    })
  });

  it('should show filtered state', (done: DoneFn) => {
    component.isSelected = true;
    fixture.detectChanges();

    const card = fixture.debugElement.nativeElement.querySelectorAll('app-todo-item');
    component.todoList$.subscribe((todoItems) => {
      const doneItems = todoItems.filter(({done}) => done).map(items => items);
      expect(card.length).toBe(doneItems.length);
      done();
    })
  });
});
