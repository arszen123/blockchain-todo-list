import { TestBed } from '@angular/core/testing';

import { LocalTodoListApiService } from './local-todo-list-api.service';

describe('LocalTodoListApiService', () => {
  let service: LocalTodoListApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalTodoListApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
