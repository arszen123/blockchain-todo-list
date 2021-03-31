import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoItem } from './interfaces/todo-item';
import { TodoListService } from './todo-list.service';

type TodoItemList = TodoItem[];

@Injectable({
  providedIn: 'root'
})
export class LocalTodoListApiService extends TodoListService {

  private _storage: TodoItemList = [];
  private items$: Subject<TodoItemList>;

  constructor() {
    super();
    this._storage = JSON.parse(localStorage.getItem('todo-list')) || [];
    this.items$ = new BehaviorSubject(this._storage);
  }

  addItem(item: TodoItem): Observable<boolean> {
    this._storage.push(item);
    this._refreshItems();
    return new BehaviorSubject(true);
  }
  getItems(): Observable<TodoItemList> {
    return this.items$;
  }
  removeItem(id: number): Observable<boolean> {
    this._storage.splice(id, 1);
    this._refreshItems();
    return new BehaviorSubject(true);
  }
  toggleItemState(id: number): Observable<boolean> {
    this._storage[id].isCompleted = !this._storage[id].isCompleted;
    this._refreshItems();
    return new BehaviorSubject(true);
  }

  private _refreshItems() {
    localStorage.setItem('todo-list', JSON.stringify(this._storage));
    this.items$.next(this._storage);
  }
}
