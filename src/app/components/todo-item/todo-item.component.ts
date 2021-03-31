import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input()
  public item: any;

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
