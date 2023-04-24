import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartFreeShipComponent } from './cart-free-ship.component';

describe('CartFreeShipComponent', () => {
  let component: CartFreeShipComponent;
  let fixture: ComponentFixture<CartFreeShipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartFreeShipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartFreeShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
