import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../../data-access/order.service';

@Component({
  selector: 'app-seller-order-detail-modal',
  templateUrl: './seller-order-detail-modal.component.html',
  styleUrls: ['./seller-order-detail-modal.component.scss'],
})
export class SellerOrderDetailModalComponent implements OnInit {
  orderList!: any[];
  orderID!: number;
  constructor(
    public dialogRef: MatDialogRef<SellerOrderDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderService
  ) {}
  ngOnInit(): void {
    const orderID = this.data.orderID;
    this.orderID = orderID;
    this.orderService.readSingleOrderDetail(orderID).subscribe((data) => {
      console.log(
        '🚀 ~ file: seller-order-detail-modal.component.ts:20 ~ SellerOrderDetailModalComponent ~ this.orderService.readSingleOrderDetail ~ data:',
        data.DT
      );
      this.orderList = data.DT;
    });
  }
}
