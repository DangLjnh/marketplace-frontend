import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerOrderListCancelComponent } from './seller-order-list-cancel.component';

describe('SellerOrderListCancelComponent', () => {
  let component: SellerOrderListCancelComponent;
  let fixture: ComponentFixture<SellerOrderListCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerOrderListCancelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerOrderListCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
