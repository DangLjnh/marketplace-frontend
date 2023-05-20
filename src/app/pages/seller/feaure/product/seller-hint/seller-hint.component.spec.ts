import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerHintComponent } from './seller-hint.component';

describe('SellerHintComponent', () => {
  let component: SellerHintComponent;
  let fixture: ComponentFixture<SellerHintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerHintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
