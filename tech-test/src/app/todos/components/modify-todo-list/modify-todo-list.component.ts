import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITodoItem } from 'src/app/core/models';

@Component({
  selector: 'app-modify-todo-list',
  templateUrl: './modify-todo-list.component.html',
  styleUrls: ['./modify-todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModifyTodoListComponent implements OnInit, OnChanges {
  readonly MAX_LENGTH = 100;
  public todoForm: FormGroup;

  @Input() todoItem: ITodoItem;
  @Input() isEditMode: boolean;
  @Output() submitted = new EventEmitter<ITodoItem>();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      label: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.maxLength(this.MAX_LENGTH)],
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.todoItem?.currentValue) {
      this.todoForm?.patchValue(this.todoItem);
    }
  }

  onSubmit(): void {
    const {label, description, category} = this.todoForm.value;
    const todoListItem: ITodoItem = {
      id: this.todoItem?.id,
      label,
      description,
      category,
      done: this.todoItem?.done
    }
    this.submitted.emit(todoListItem);
    this.todoForm.reset();
  }
}
