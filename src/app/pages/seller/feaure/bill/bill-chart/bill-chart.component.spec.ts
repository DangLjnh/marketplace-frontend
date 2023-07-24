import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillChartComponent } from './bill-chart.component';

describe('BillChartComponent', () => {
  let component: BillChartComponent;
  let fixture: ComponentFixture<BillChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
