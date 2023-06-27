import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPayMomoOrderComponent } from './checkout-pay-momo-order.component';

describe('CheckoutPayMomoOrderComponent', () => {
  let component: CheckoutPayMomoOrderComponent;
  let fixture: ComponentFixture<CheckoutPayMomoOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutPayMomoOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutPayMomoOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
