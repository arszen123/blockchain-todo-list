import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoItem } from 'src/app/services/interfaces/todo-item';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input()
  public item: TodoItem;

  @Output()
  public onDelete = new EventEmitter<void>();
  @Output()
  public onToggleState = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleState() {
    this.onToggleState.emit();
  }

  removeItem() {
    this.onDelete.emit();
  }

}
