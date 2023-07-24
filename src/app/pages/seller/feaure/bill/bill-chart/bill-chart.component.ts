import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartConfiguration, ChartType, ChartData } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { OrderService } from '../../../data-access/order.service';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
@Component({
  selector: 'app-bill-chart',
  templateUrl: './bill-chart.component.html',
  styleUrls: ['./bill-chart.component.scss'],
})
export class BillChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  countriesData = [];
  totalDeath: (number | [number, number] | null)[] = [];
  totalConfirm: (number | [number, number] | null)[] = [];
  totalCountry: string[] = [];
  totalColumns = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  currentTotalColumn = 12;
  barChartData!: ChartData<'bar'>;

  public barChartLegend = true;
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

  public barChartType: ChartType = 'bar';
  barChartPlugins = [DataLabelsPlugin];

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.dataUser$.subscribe((data) => {
      if (data) {
        const rawData = {
          shopID: data?.Shop?.id,
          year: new Date(data.Shop.createdAt).getFullYear(),
        };
        this.orderService.readRevenueByYear(rawData).subscribe((data) => {
          if (+data.EC == 0) {
            const fakeResponse = this.generateFakeData(this.currentTotalColumn);
            fakeResponse.Countries.map((item: any) => {
              this.totalDeath.push(item.TotalDeaths);
              this.totalCountry.push(item.Country);
              this.totalConfirm.push(item.TotalConfirmed);
            });
            this.barChartData = {
              labels: this.totalCountry,
              datasets: data.DT,
            };
          }
        });
      }
    });
    // Simulate API response with fake data
  }

  // Function to generate fake data for demonstration
  generateFakeData(columnCount: number): any {
    const fakeData: any = {
      Countries: [],
    };

    for (let i = 1; i <= columnCount; i++) {
      fakeData.Countries.push({
        Country: `Tháng ${i}`,
        TotalDeaths: Math.floor(Math.random() * 1000),
        TotalConfirmed: Math.floor(Math.random() * 5000),
      });
    }
    return fakeData;
  }
}
