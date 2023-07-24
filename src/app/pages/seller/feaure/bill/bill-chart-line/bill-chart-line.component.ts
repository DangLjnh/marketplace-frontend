import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartConfiguration, ChartType, ChartData } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { OrderService } from '../../../data-access/order.service';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';

@Component({
  selector: 'app-bill-chart-line',
  templateUrl: './bill-chart-line.component.html',
  styleUrls: ['./bill-chart-line.component.scss'],
})
export class BillChartLineComponent {
  @Input() type: string = 'month';
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  lineChartData!: ChartData<'line'>;
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };

  barChartPlugins = [DataLabelsPlugin];
  public lineChartType: ChartType = 'line';

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.dataUser$.subscribe((data) => {
      if (data) {
        if (this.type === 'month') {
          const rawData = {
            shopID: data?.Shop?.id,
            month: new Date().getMonth() + 1,
          };
          this.orderService.readRevenueByMonth(rawData).subscribe((data) => {
            if (+data.EC == 0) {
              this.lineChartData = {
                labels: data.DT.day,
                datasets: [
                  {
                    label: 'Tổng doanh thu tháng',
                    data: data.DT.revenues,
                    fill: false,
                    borderColor: '#f6e58d',
                    backgroundColor: '#f6e58d',
                    pointRadius: 0,
                    datalabels: {
                      anchor: 'center',
                      align: 'center',
                    },
                  },
                ],
              };
            }
          });
        }
        if (this.type === 'day') {
          const rawData = {
            shopID: data?.Shop?.id,
          };
          this.orderService.readRevenueByDay(rawData).subscribe((data) => {
            if (+data.EC == 0) {
              this.orderService.totalRevenueOfDay = data.DT.totalRevenue;
              this.lineChartData = {
                labels: data.DT.hour,
                datasets: [
                  {
                    label: 'Doanh thu hôm nay',
                    data: data.DT.revenues,
                    fill: false,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    pointRadius: 0,
                    datalabels: {
                      anchor: 'center',
                      align: 'center',
                    },
                  },
                ],
              };
            }
          });
        }
      }
    });
    // Simulate API response with fake data
  }
}
