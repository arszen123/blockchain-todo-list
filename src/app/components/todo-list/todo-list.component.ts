import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoItem } from 'src/app/services/interfaces/todo-item';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input()
  public items: TodoItem[];

  @Input()
  public selected: number;
  @Output()
  public selectedChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  selectItem(index: number) {
    this.selected = index;
    this.selectedChange.emit(index);
  }

}
