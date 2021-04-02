import { Component, OnInit } from '@angular/core';

declare let window;

@Component({
  selector: 'app-dialog-no-web3-provider',
  templateUrl: './dialog-no-web3-provider.component.html',
  styleUrls: ['./dialog-no-web3-provider.component.scss']
})
export class DialogNoWeb3ProviderComponent {

  constructor() { }

  reload() {
    location.reload();
  }

}
