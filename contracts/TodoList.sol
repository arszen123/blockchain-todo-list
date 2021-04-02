// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TodoList {
  struct TodoItem {
    string title;
    string description;
    bool isCompleted;
  }

  event ItemAdded(address _address, string _title, string _description);
  event ItemStateToggled(address _address, string _title, string _description, bool _isCompleted);
  event ItemRemoved(address _address, string _title, string _description, bool _isCompleted);

  mapping(address => TodoItem[]) _todoList;

  modifier itemExists(uint _idx) {
    _assertIndex(msg.sender, _idx);
    _;
  }

  constructor() public {
  }

  function addItem(string memory _title, string memory _description) public {
    address _address = msg.sender;
    TodoItem memory _item = TodoItem(_title, _description, false);
    _todoList[_address].push(_item);
    emit ItemAdded(_address, _item.title, _item.description);
  }

  function getItem(address _address, uint _idx) public view returns (string memory title, string memory description, bool isCompleted) {
    _assertIndex(_address, _idx);
    TodoItem memory _item = _todoList[_address][_idx];
    return (_item.title, _item.description, _item.isCompleted);
  }

  function toggleItemState(uint _idx) public itemExists(_idx) {
    address _address = msg.sender;
    TodoItem storage _item = _todoList[_address][_idx];
    _item.isCompleted = !_item.isCompleted;
    emit ItemStateToggled(_address, _item.title, _item.description, _item.isCompleted);
  }

  function removeItem(uint _idx) public itemExists(_idx) {
    address _address = msg.sender;
    TodoItem[] storage _items = _todoList[_address];
    TodoItem memory _item = _items[_idx];

    for (uint i = _idx; i < _items.length - 1; i++) {
      _items[i] = _items[i + 1];
    }

    if (_idx == 0 && _items.length == 1) {
      delete _todoList[_address];
    } else {
      _items.pop();
    }
    emit ItemRemoved(_address, _item.title, _item.description, _item.isCompleted);
  }

  function getNumberOfItems(address _address) public view returns (uint) {
    return _todoList[_address].length;
  }

  function _assertIndex(address _address, uint _idx) private view {
    require(_todoList[_address].length > _idx && _idx >= 0, 'Out of bound!');
  }

}
