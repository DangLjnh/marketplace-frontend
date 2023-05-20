import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerHintTotalComponent } from './seller-hint-total.component';

describe('SellerHintTotalComponent', () => {
  let component: SellerHintTotalComponent;
  let fixture: ComponentFixture<SellerHintTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerHintTotalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerHintTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
