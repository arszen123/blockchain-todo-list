import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoItem } from 'src/app/services/interfaces/todo-item';
import { TodoListService } from 'src/app/services/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input()
  public items: TodoItem[];

  @Output()
  public itemSelected = new EventEmitter<{ item: TodoItem, index: number }>();

  constructor() { }

  ngOnInit(): void {
  }

  selectItem(item: TodoItem, index: number) {
    this.itemSelected.emit({ item, index });
  }

}
