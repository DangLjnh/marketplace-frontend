import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProductCategoryModalComponent } from './seller-product-category-modal.component';

describe('SellerProductCategoryModalComponent', () => {
  let component: SellerProductCategoryModalComponent;
  let fixture: ComponentFixture<SellerProductCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerProductCategoryModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerProductCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
