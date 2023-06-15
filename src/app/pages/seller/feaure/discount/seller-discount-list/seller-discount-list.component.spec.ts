import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDiscountListComponent } from './seller-discount-list.component';

describe('SellerDiscountListComponent', () => {
  let component: SellerDiscountListComponent;
  let fixture: ComponentFixture<SellerDiscountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerDiscountListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerDiscountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
