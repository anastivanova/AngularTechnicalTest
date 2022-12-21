import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { MOCKED_TODO_ITEMS } from 'src/app/shared/mocks';

import { TodoItemComponent } from './todo-item.component';
import { By } from '@angular/platform-browser';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule, SharedModule ],
      declarations: [ TodoItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todoItem = MOCKED_TODO_ITEMS[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct title', () => {
    const title = fixture.debugElement.nativeElement.querySelector('mat-card-title');
    expect(title.textContent).toContain(component.todoItem.label);
  });

  it('should render correct description', () => {
    const description = fixture.debugElement.nativeElement.querySelector('mat-card-content');
    expect(description.textContent).toContain(component.todoItem.description);
  });

  it('should show edit mode if edit button was clicked', () => {
    spyOn(component, 'onEdit');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#editBtn')).nativeElement;
    button.click();

    expect(component.onEdit).toHaveBeenCalledWith(component.todoItem);
  });

  it('should delete item if delete button was clicked', () => {
    spyOn(component, 'onDelete');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#deleteBtn')).nativeElement;
    button.click();

    expect(component.onDelete).toHaveBeenCalledWith(component.todoItem.id);
  });
});
