import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderChooseCartModalComponent } from './header-choose-cart-modal.component';

describe('HeaderChooseCartModalComponent', () => {
  let component: HeaderChooseCartModalComponent;
  let fixture: ComponentFixture<HeaderChooseCartModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderChooseCartModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderChooseCartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
