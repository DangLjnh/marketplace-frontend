import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTooltipCartComponent } from './header-tooltip-cart.component';

describe('HeaderTooltipCartComponent', () => {
  let component: HeaderTooltipCartComponent;
  let fixture: ComponentFixture<HeaderTooltipCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderTooltipCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderTooltipCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
