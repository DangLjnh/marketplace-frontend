import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutAddressModalComponent } from './checkout-address-modal.component';

describe('CheckoutAddressModalComponent', () => {
  let component: CheckoutAddressModalComponent;
  let fixture: ComponentFixture<CheckoutAddressModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutAddressModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutAddressModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
