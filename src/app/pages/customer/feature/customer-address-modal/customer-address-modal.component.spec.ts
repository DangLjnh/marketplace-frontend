import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddressModalComponent } from './customer-address-modal.component';

describe('CustomerAddressModalComponent', () => {
  let component: CustomerAddressModalComponent;
  let fixture: ComponentFixture<CustomerAddressModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAddressModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAddressModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
