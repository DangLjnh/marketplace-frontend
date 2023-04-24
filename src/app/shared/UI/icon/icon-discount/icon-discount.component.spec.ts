import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconDiscountComponent } from './icon-discount.component';

describe('IconDiscountComponent', () => {
  let component: IconDiscountComponent;
  let fixture: ComponentFixture<IconDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconDiscountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
