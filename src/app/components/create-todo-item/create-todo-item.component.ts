import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-todo-item',
  templateUrl: './create-todo-item.component.html',
  styleUrls: ['./create-todo-item.component.scss']
})
export class CreateTodoItemComponent implements OnInit {
  public form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })

  @Output()
  public create = new EventEmitter<{ title: string, description: string }>();

  constructor() { }

  ngOnInit(): void {
  }

  save() {
    if (this.form.value) {
      this.create.emit(this.form.value);
    }
  }

}
