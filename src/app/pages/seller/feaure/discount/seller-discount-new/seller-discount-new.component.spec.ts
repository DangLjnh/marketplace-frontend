import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDiscountNewComponent } from './seller-discount-new.component';

describe('SellerDiscountNewComponent', () => {
  let component: SellerDiscountNewComponent;
  let fixture: ComponentFixture<SellerDiscountNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerDiscountNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerDiscountNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
