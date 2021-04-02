import { TestBed } from '@angular/core/testing';

import { TodoListContractService } from './todo-list-contract.service';

describe('TodoListContractService', () => {
  let service: TodoListContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoListContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
