import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { CreateTodoItemComponent } from './components/create-todo-item/create-todo-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { LocalTodoListApiService } from './services/local-todo-list-api.service';
import { TodoListService } from './services/todo-list.service';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoListContractService } from './services/todo-list-contract.service';
import { DialogNoWeb3ProviderComponent } from './components/dialog-no-web3-provider/dialog-no-web3-provider.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    CreateTodoItemComponent,
    DialogNoWeb3ProviderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule,
  ],
  providers: [
    // Choose between localStorage and ethereum contract.
    // { provide: TodoListService, useClass: LocalTodoListApiService },
    { provide: TodoListService, useClass: TodoListContractService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
