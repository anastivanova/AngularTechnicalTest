import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { MOCKED_TODO_ITEMS } from 'src/app/shared/mocks';
import { ModifyTodoListComponent } from './modify-todo-list.component';

describe('ModifyTodoListComponent', () => {
  let component: ModifyTodoListComponent;
  let fixture: ComponentFixture<ModifyTodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule, SharedModule ],
      declarations: [ ModifyTodoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain correct initials values', () => {
    const formValues = {
      label: '',
      description: '',
      category: ''
    }

    expect(component.todoForm.value).toEqual(formValues);
  });

  it('should submit form whem button was clicked', () => {
    component.todoForm.patchValue(MOCKED_TODO_ITEMS[0]);
    spyOn(component, 'onSubmit');
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(component.onSubmit).toHaveBeenCalled();
  });
});
