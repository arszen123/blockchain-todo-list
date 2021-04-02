import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { TodoItem } from './interfaces/todo-item';
import { TodoListService } from './todo-list.service';
import { ContractWithAddress, Web3Service } from './web3.service';
const todoListArtifacts = require('@contracts/TodoList.json');

type Transaction = {sendTransaction(...args)} & ((...args) => any);
interface TodoContract {
  addItem: Transaction;
  removeItem: Transaction;
  toggleItemState: Transaction;
  getNumberOfItems(address: string): number;
  getItem(address: string, index: number): number;
}

@Injectable({
  providedIn: 'root'
})
export class TodoListContractService extends TodoListService {

  private contract: Observable<ContractWithAddress<TodoContract>>;
  private items$: ReplaySubject<TodoItem[]>;

  constructor(private web3: Web3Service) {
    super();
    this.contract = this.web3.getContract<TodoContract>(todoListArtifacts);
  }

  addItem(item: TodoItem): Observable<boolean> {
    return this.contract.pipe(mergeMap(async ({contract, address}) => {
      try {
        await contract.addItem.sendTransaction(item.title, item.description, { from: address });
      } catch (e) {
        return false;
      }
      this._syncItems();
      return true;
    }));
  }

  getItems(): Observable<TodoItem[]> {
    if (!this.items$) {
      this.items$ = new ReplaySubject(1);
      this._syncItems();
    }
    return this.items$;
  }

  removeItem(id: number): Observable<boolean> {
    return this.contract.pipe(mergeMap(async ({contract, address}) => {
      try {
        await contract.removeItem.sendTransaction(id, {from: address});
      } catch (e) {
        return false;
      }
      this._syncItems();
      return true;
    }));
  }
  toggleItemState(id: number): Observable<boolean> {
    return this.contract.pipe(mergeMap(async ({contract, address}) => {
      try {
        await contract.toggleItemState.sendTransaction(id, {from: address});
      } catch (e) {
        return false;
      }
      this._syncItems();
      return true;
    }));
  }

  _syncItems() {
    const sub = this.contract.subscribe(async ({contract, address}) => {
      const numOfItems = await contract.getNumberOfItems(address)
      const items = [];
      for (let i = 0; i < numOfItems; i++) {
        items.push(await contract.getItem(address, i));
      }
      this.items$.next(items);
      sub.unsubscribe();
    });
  }
}
