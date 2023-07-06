import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailChooseCartModalComponent } from './product-detail-choose-cart-modal.component';

describe('ProductDetailChooseCartModalComponent', () => {
  let component: ProductDetailChooseCartModalComponent;
  let fixture: ComponentFixture<ProductDetailChooseCartModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailChooseCartModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailChooseCartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
