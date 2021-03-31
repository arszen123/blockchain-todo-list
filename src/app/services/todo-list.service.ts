import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from './interfaces/todo-item';

@Injectable({
  providedIn: 'root'
})
export abstract class TodoListService {
  abstract addItem(item: TodoItem): Observable<boolean>;
  abstract getItems(): Observable<TodoItem[]>;
  abstract removeItem(id: number): Observable<boolean>;
  abstract toggleItemState(id: number): Observable<boolean>;
}
