import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillChartDayComponent } from './bill-chart-day.component';

describe('BillChartDayComponent', () => {
  let component: BillChartDayComponent;
  let fixture: ComponentFixture<BillChartDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillChartDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillChartDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
