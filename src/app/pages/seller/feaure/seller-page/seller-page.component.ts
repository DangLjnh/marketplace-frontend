import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../data-access/order.service';
import { statusOrder, statusProduct } from 'src/app/shared/model/model';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { ProductService } from '../../data-access/product.service';

@Component({
  selector: 'app-seller-page',
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.scss'],
})
export class SellerPageComponent implements OnInit {
  totalRevenueOfDay: number = 0;
  totalOrderPending: number = 0;
  totalOrderDelivering: number = 0;
  totalProductActive: number = 0;
  listNeedWork: any[] = []; // Initialize an empty array

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.orderService.totalRevenueOfDay$.subscribe((data) => {
      this.totalRevenueOfDay = data;
      this.updateListNeedWork(); // Call the method to update the list
    });
    this.authService.dataUser$.subscribe((data) => {
      const rawOrderDataPending = {
        statusID: statusOrder.PENDING,
        shopID: data?.Shop?.id,
      };
      this.orderService
        .readQuantityOrder(rawOrderDataPending)
        .subscribe((data) => {
          this.totalOrderPending = data.DT;
          this.updateListNeedWork(); // Call the method to update the list
        });
    });
    this.authService.dataUser$.subscribe((data) => {
      const rawOrderData = {
        statusID: statusOrder.DELIVERING,
        shopID: data?.Shop?.id,
      };
      this.orderService.readQuantityOrder(rawOrderData).subscribe((data) => {
        this.totalOrderDelivering = data.DT;
        this.updateListNeedWork(); // Call the method to update the list
      });
    });
    this.authService.dataUser$.subscribe((data) => {
      const rawProductData = {
        statusID: statusProduct.ACTIVE,
        shopID: data?.Shop?.id,
      };
      this.productService
        .readQuantityProductStatus(rawProductData)
        .subscribe((data) => {
          this.totalProductActive = data.DT;
          this.updateListNeedWork(); // Call the method to update the list
        });
    });
  }

  updateListNeedWork(): void {
    this.listNeedWork = [
      { id: 1, data: this.totalRevenueOfDay, title: 'Tổng doanh thu hôm nay' },
      { id: 2, data: this.totalOrderPending, title: 'Đơn hàng chờ xác nhận' },
      {
        id: 3,
        data: this.totalOrderDelivering,
        title: 'Đơn hàng đang vận chuyển',
      },
      {
        id: 4,
        data: this.totalProductActive,
        title: 'Tổng sản phẩm đang bán',
      },
    ];
  }
}
