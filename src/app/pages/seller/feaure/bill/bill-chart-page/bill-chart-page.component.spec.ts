import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillChartPageComponent } from './bill-chart-page.component';

describe('BillChartPageComponent', () => {
  let component: BillChartPageComponent;
  let fixture: ComponentFixture<BillChartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillChartPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillChartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
