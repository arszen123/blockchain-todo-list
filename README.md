# BlockchainTodoList Application

## Pre requirements

1. Ethereum development framework [Truffle](https://www.trufflesuite.com/truffle)
2. Local Ethereum blockchain [Ganache](https://www.trufflesuite.com/ganache)
3. Web3 provider [MetaMask](https://metamask.io/download.html)

## Start application

### Start local blockchain

Run ```ganache``` cli, to start a local ethereum blockchain.

### Deploy contract

Run ```truffle deploy``` to deploy contract on the local blockchain.

### Test contract

Run ```truffle test``` to test the deployed contract.

### Configure MetaMask

1. Change MetaMask network to localhost.
2. Copy a private key from the available list, diplayed by ```ganache``` cli.
3. In MetaMask, import a new account with the previously copied private key. Now you have some ETH, and you can interact with the application.

### Start angular development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/` and connect the MetaMask account to the application.


To use localStorage instead of Ethereum contract, modify the provider definition of ```TodoListService``` in ```app.module.ts``` to use the correct service class.