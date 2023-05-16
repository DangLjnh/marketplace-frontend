import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductRowComponent } from './form-product-row.component';

describe('FormProductRowComponent', () => {
  let component: FormProductRowComponent;
  let fixture: ComponentFixture<FormProductRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormProductRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormProductRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
