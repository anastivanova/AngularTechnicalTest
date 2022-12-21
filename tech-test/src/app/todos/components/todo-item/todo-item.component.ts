import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITodoItem } from 'src/app/core/models';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todoItem: ITodoItem;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<ITodoItem>();
  @Output() update = new EventEmitter<ITodoItem>();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(id: number): void {
    this.delete.emit(id);
  }

  onEdit(todoItem: ITodoItem): void {
    this.edit.emit(todoItem);
  }

  onUpdate(todoItem: ITodoItem): void {
    this.update.emit({...todoItem, done: !todoItem.done});
  }
}
