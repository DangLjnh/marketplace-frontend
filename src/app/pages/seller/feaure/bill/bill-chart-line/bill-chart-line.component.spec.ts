import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillChartLineComponent } from './bill-chart-line.component';

describe('BillChartLineComponent', () => {
  let component: BillChartLineComponent;
  let fixture: ComponentFixture<BillChartLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillChartLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillChartLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
