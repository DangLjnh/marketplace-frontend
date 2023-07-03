import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComparePriceModalComponent } from './product-compare-price-modal.component';

describe('ProductComparePriceModalComponent', () => {
  let component: ProductComparePriceModalComponent;
  let fixture: ComponentFixture<ProductComparePriceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComparePriceModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComparePriceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
