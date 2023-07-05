import { Observable, filter, map, switchMap } from 'rxjs';
import { AuthService } from './../../../../auth/data-access/auth.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../data-access/order.service';
import { IUser } from 'src/app/shared/model/interface';
import { MatDialog } from '@angular/material/dialog';
import { SellerOrderDetailModalComponent } from '../seller-order-detail-modal/seller-order-detail-modal.component';
import { errorCode, statusOrder } from 'src/app/shared/model/model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seller-order-list',
  templateUrl: './seller-order-list.component.html',
  styleUrls: ['./seller-order-list.component.scss'],
})
export class SellerOrderListComponent implements OnInit {
  // dataUser!: IUser;
  listOrderActive$!: Observable<any[]>;
  navTabs = [
    {
      name: 'Tất cả',
    },
    {
      name: 'Đang diễn ra',
    },
    {
      name: 'Sắp diễn ra',
    },
    {
      name: 'Đã kết thúc',
    },
  ];
  updateStatusDone(orderID: number) {
    const rawData = {
      orderID,
      statusID: statusOrder.DELIVERED,
    };

    this.orderService.updateStatusOrder(rawData).subscribe((data) => {
      if (+data.EC === errorCode.SUCCESS) {
        this.toastrService.success(data.EM);
        this.listOrderActive$ = this.authService.dataUser$.pipe(
          switchMap((data) =>
            this.orderService.readAllOrderActiveOfShop(data.Shop.id)
          ),
          filter((order) => !!order),
          map((order) => order.DT)
        );
      } else {
        this.toastrService.error(data.EM);
      }
    });
  }
  openModalOrderDetail(orderID: number) {
    this.dialog.open(SellerOrderDetailModalComponent, {
      data: {
        orderID,
      },
    });
  }
  formatDate(time: Date) {
    const date = new Date(time);
    return date.toLocaleString();
  }
  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    public dialog: MatDialog,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.listOrderActive$ = this.authService.dataUser$.pipe(
      switchMap((data) =>
        this.orderService.readAllOrderActiveOfShop(data.Shop.id)
      ),
      filter((order) => !!order),
      map((order) => order.DT)
    );
  }
}
