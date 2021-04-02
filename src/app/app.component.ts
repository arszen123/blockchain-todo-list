import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from './services/interfaces/todo-item';
import { TodoListService } from './services/todo-list.service';
import { Web3Service } from './services/web3.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogNoWeb3ProviderComponent } from './components/dialog-no-web3-provider/dialog-no-web3-provider.component';
import { TodoListContractService } from './services/todo-list-contract.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';

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
  public selectedItem$: Observable<TodoItem>;
  private _rightContentType: RightContentType;
  private _selectedItemIndex: number|null;

  get selectedItemIndex(): number|null {
    return this._selectedItemIndex;
  }
  set selectedItemIndex(value: number|null) {
    this._selectedItemIndex = value;
    this.selectedItem$ = this.items$.pipe(map(items => items[this._selectedItemIndex]));
    this.setRightContentType('show');
  }

  constructor(
    private listService: TodoListService,
    private web3: Web3Service,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    if (this.listService instanceof TodoListContractService) {
      this.web3.hasWeb3Provider().subscribe(res => {
        if (!res) {
          this.dialog.open(DialogNoWeb3ProviderComponent, { disableClose: true });
          return;
        }
        this._initItems();
      });
      return;
    }
    this._initItems();
  }

  _initItems() {
    this.items$ = this.listService.getItems();
  }

  removeItem() {
    this.listService.removeItem(this.selectedItemIndex).subscribe(res => {
      if (res) {
        this.selectedItemIndex = null;
        this.setRightContentType(null);
      }
      this._showMessage('Item removed', !res);
    });
  }

  toggleItemState() {
    this.listService.toggleItemState(this.selectedItemIndex).subscribe(res => {
      this._showMessage('Item state toggled', !res);
    });
  }

  save(item: TodoItem) {
    this.listService.addItem(item).subscribe(res => {
      if (res) {
        this.setRightContentType('show');
      }
      this._showMessage('Item added', !res);
    });
  }

  isRightContent(type: RightContentType) {
    return this._rightContentType === type;
  }

  setRightContentType(type: RightContentType) {
    if (type === 'show' && this.selectedItemIndex === null) {
      return;
    }
    this._rightContentType = type;
  }

  private _showMessage(message: string, showErrorMessage: boolean) {
    if (showErrorMessage) {
      message = 'Something went wrong. Please try again.'
    }
    this._snackBar.open(message, 'Ok', {
      duration: 2000,
    });
  }
}
