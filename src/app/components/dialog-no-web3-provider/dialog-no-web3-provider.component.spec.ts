import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNoWeb3ProviderComponent } from './dialog-no-web3-provider.component';

describe('DialogNoWeb3ProviderComponent', () => {
  let component: DialogNoWeb3ProviderComponent;
  let fixture: ComponentFixture<DialogNoWeb3ProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNoWeb3ProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNoWeb3ProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
