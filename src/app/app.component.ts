import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from './services/interfaces/todo-item';
import { TodoListService } from './services/todo-list.service';

type RightContentType = 'show' | 'edit' | null;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public items$: Observable<TodoItem[]>;
  public item: TodoItem;
  public index: number;
  private _rightContentType: RightContentType;

  constructor(private listService: TodoListService) {
  }

  ngOnInit() {
    this.items$ = this.listService.getItems();
  }

  setSelectedItem({ item, index }: {item: TodoItem, index: number}) {
    this.item = item;
    this.index = index;
    this.setRightContentType('show');
  }

  removeItem() {
    this.listService.removeItem(this.index);
    this.item = null;
    this.index = null;
    this.setRightContentType(null);
  }

  toggleItemState() {
    this.listService.toggleItemState(this.index);
  }

  save(item: TodoItem) {
    this.listService.addItem(item);
    this.setRightContentType('show');
  }

  isRightContent(type: RightContentType) {
    return this._rightContentType === type;
  }

  setRightContentType(type: RightContentType) {
    if (type === 'show' && !this.item) {
      return;
    }
    this._rightContentType = type;
  }
}
