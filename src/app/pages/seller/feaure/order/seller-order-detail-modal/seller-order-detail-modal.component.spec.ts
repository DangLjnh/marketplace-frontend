import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerOrderDetailModalComponent } from './seller-order-detail-modal.component';

describe('SellerOrderDetailModalComponent', () => {
  let component: SellerOrderDetailModalComponent;
  let fixture: ComponentFixture<SellerOrderDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerOrderDetailModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerOrderDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
