import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryOptionComponent } from './product-category-option.component';

describe('ProductCategoryOptionComponent', () => {
  let component: ProductCategoryOptionComponent;
  let fixture: ComponentFixture<ProductCategoryOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoryOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCategoryOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
