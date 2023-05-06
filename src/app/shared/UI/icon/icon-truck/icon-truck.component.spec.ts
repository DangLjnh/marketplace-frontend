import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTruckComponent } from './icon-truck.component';

describe('IconTruckComponent', () => {
  let component: IconTruckComponent;
  let fixture: ComponentFixture<IconTruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconTruckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
