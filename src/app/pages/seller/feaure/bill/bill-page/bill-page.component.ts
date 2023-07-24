import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../data-access/order.service';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { IUser } from 'src/app/shared/model/interface';
import { SellerOrderDetailModalComponent } from '../../order/seller-order-detail-modal/seller-order-detail-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss'],
})
export class BillPageComponent implements OnInit {
  dataUser!: IUser;
  listBill!: any[];
  totalItems!: number;
  length: number = 0;
  pageSize: number = 0;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageIndex = e.pageIndex;

    const rawData = {
      shopID: this?.dataUser?.Shop?.id,
      offset: e.pageIndex * e.pageSize,
      limit: e.pageSize,
    };
    this.billService.readAllBill(rawData).subscribe((data) => {
      this.listBill = data.DT.data;
    });
  }
  formatDate(time: Date) {
    const date = new Date(time);
    return date.toLocaleString('en-GB');
  }
  openModalOrderDetail(orderID: number) {
    this.dialog.open(SellerOrderDetailModalComponent, {
      data: {
        orderID,
      },
    });
  }
  constructor(
    private billService: OrderService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authService.dataUser$.subscribe((data) => {
      this.dataUser = data;
      if (data) {
        const rawData = {
          shopID: data?.Shop?.id,
          offset: 0,
          limit: 5,
        };
        this.billService.readAllBill(rawData).subscribe((data) => {
          this.length = data.DT.totalItems;
          this.listBill = data.DT.data;
        });
      }
    });
  }
}
