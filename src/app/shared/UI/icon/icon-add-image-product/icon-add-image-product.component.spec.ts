import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconAddImageProductComponent } from './icon-add-image-product.component';

describe('IconAddImageProductComponent', () => {
  let component: IconAddImageProductComponent;
  let fixture: ComponentFixture<IconAddImageProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconAddImageProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconAddImageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
