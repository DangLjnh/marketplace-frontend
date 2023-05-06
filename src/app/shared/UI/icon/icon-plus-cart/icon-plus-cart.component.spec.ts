import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconPlusCartComponent } from './icon-plus-cart.component';

describe('IconPlusCartComponent', () => {
  let component: IconPlusCartComponent;
  let fixture: ComponentFixture<IconPlusCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconPlusCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconPlusCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
