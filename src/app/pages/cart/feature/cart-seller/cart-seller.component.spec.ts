import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSellerComponent } from './cart-seller.component';

describe('CartSellerComponent', () => {
  let component: CartSellerComponent;
  let fixture: ComponentFixture<CartSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartSellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
