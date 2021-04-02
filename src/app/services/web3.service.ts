import { Injectable } from '@angular/core';
import { combineLatest, from, Observable } from 'rxjs';
import { map, mergeMap, shareReplay } from 'rxjs/operators';
import Web3 from 'web3';
const contract = require('@truffle/contract');

declare let window: Window & { ethereum?: any, web3?: any };

export type ContractWithAddress<T> = { contract: T, address: string };

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private web3: Web3;

  constructor() {
    this._init();
  }

  private _init(): void {
    const web3Provider = window.ethereum || window.web3;
    if (typeof web3Provider !== 'undefined') {
      this.web3 = new Web3(web3Provider);
    }
  }

  public hasWeb3Provider() {
    return from((async () => {
      return typeof this.web3 !== 'undefined';
    })())
  }

  public getAccounts() {
    return from((async () => {
      const accs = await this.web3.eth.getAccounts();
      if (accs.length === 0) {
        const accs = await this.web3.eth.requestAccounts();
        if (accs.length !== 0) {
          return accs;
        }
        throw new NoWeb3AccountsError();
      }
      return accs;
    })());
  }

  public getAccount() {
    return this.getAccounts().pipe(map(accounts => accounts[0]));
  }

  public getContract<T>(artifacts): Observable<ContractWithAddress<T>> {
    const contractAbstraction = contract(artifacts);
    contractAbstraction.setProvider(this.web3.currentProvider);
    const res = from(contractAbstraction.deployed())
    return combineLatest([res, this.getAccount()]).pipe(map(res => {
      return { contract: res[0], address: res[1] }
    })) as Observable<ContractWithAddress<T>>;
  }
}

export class Web3Error extends Error {

}

export class NoWeb3AccountsError extends Web3Error {

}
