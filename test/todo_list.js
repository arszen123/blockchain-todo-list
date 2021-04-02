const TodoList = artifacts.require("TodoList");
const truffleAssertions = require("truffle-assertions");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("TodoList", function (accounts) {
  it("should assert true", async function () {
    await TodoList.deployed();
    return assert.isTrue(true);
  });
  const item = {title: 'Test', description: 'Do some tests!'};

  it("should add a new item", async function() {
    const contract = await TodoList.deployed();
    const res = await contract.addItem(item.title, item.description, {from: accounts[0]});
    truffleAssertions.eventEmitted(res, 'ItemAdded', (e) => {
      return e._title === item.title && e._description === item.description
    })
  });
  it("should return the number of items correctly", async function () {
    const contract = await TodoList.deployed();
    const numOfItems = await contract.getNumberOfItems(accounts[0]);
    expect(numOfItems.toNumber()).to.equal(1);
  });
  it("should return the newly added item", async function () {
    const contract = await TodoList.deployed();
    const res = await contract.getItem(accounts[0], 0);
    expect(res.title).to.equal(item.title);
    expect(res.description).to.equal(item.description);
    expect(res.isCompleted).to.equal(false);
  });
  it("should toggle the newly added item state", async function () {
    const contract = await TodoList.deployed();
    const res = await contract.toggleItemState(0, {from: accounts[0]});
    truffleAssertions.eventEmitted(res, 'ItemStateToggled', (e) => {
      return e._isCompleted === true;
    })
  });
  it("should remove the newly added item", async function () {
    const contract = await TodoList.deployed();
    const res = await contract.removeItem(0, {from: accounts[0]});
    truffleAssertions.eventEmitted(res, 'ItemRemoved', (e) => {
      return e._title === item.title && e._description === item.description;
    })
  });
  it("should return the number of items correctly after item is deleted", async function () {
    const contract = await TodoList.deployed();
    const numOfItems = await contract.getNumberOfItems(accounts[0]);
    expect(numOfItems.toNumber()).to.equal(0);
  });
  describe("should revert when", function() {
    it("tries to get a non existent item", async function() {
      const contract = await TodoList.deployed();
      const res = contract.getItem(accounts[0], 100);
      truffleAssertions.reverts(res, 'Out of bound!');
    });
    it("tries to toggle a non existent item state", async function() {
      const contract = await TodoList.deployed();
      const res = contract.toggleItemState(100, {from: accounts[0]});
      truffleAssertions.reverts(res, 'Out of bound!');
    });
    it("tries to remove a non existent item", async function() {
      const contract = await TodoList.deployed();
      const res = contract.removeItem(100, {from: accounts[0]});
      truffleAssertions.reverts(res, 'Out of bound!');
    });
  });
});
