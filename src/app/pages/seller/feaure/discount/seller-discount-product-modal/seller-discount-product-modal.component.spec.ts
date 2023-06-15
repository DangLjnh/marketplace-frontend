import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDiscountProductModalComponent } from './seller-discount-product-modal.component';

describe('SellerDiscountProductModalComponent', () => {
  let component: SellerDiscountProductModalComponent;
  let fixture: ComponentFixture<SellerDiscountProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerDiscountProductModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerDiscountProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
