import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITodoItem } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  readonly configUrl = 'http://localhost:3000/tasks';
  private _todoList$: BehaviorSubject<ITodoItem[]> = new BehaviorSubject([]);

  public get todoList$(): Observable<ITodoItem[]> {
    return this._todoList$.asObservable();
  }

  public get todoList(): ITodoItem[] {
    return this._todoList$.getValue();
  }

  constructor(
    private http: HttpClient
  ) { }

  getTodoList() {
    return this.http.get<ITodoItem[]>(this.configUrl).subscribe((data) => this._todoList$.next(data));
  }

  addTodoListItem(todoListItem: ITodoItem) {
    return this.http.post<ITodoItem>(this.configUrl, todoListItem)
      .subscribe((data) => this._todoList$.next([...this._todoList$.getValue(), data]));
  }

  updateTodoListItem(todoListItem: ITodoItem) {
    const url = `${this.configUrl}/${todoListItem.id}`
    return this.http.patch<ITodoItem>(url, todoListItem).subscribe((updatedTodoItem) => {
      const todoList = this.todoList.map(todoItem => todoItem.id === todoListItem.id ? updatedTodoItem : todoItem);
      this._todoList$.next(todoList);
    });
  }

  deleteTodoListItem(id: number) {
    const url = `${this.configUrl}/${id}`
    return this.http.delete(url).subscribe(() => {
      const todoList = this.todoList.filter(({id: todoItemId}) => todoItemId !== id)
      this._todoList$.next(todoList);
    });
  }
}

