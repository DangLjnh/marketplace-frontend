import { Observable, filter, map, switchMap, Subscription } from 'rxjs';
import { AuthService } from './../../../../auth/data-access/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../../../data-access/order.service';
import { IUser } from 'src/app/shared/model/interface';
import { MatDialog } from '@angular/material/dialog';
import { SellerOrderDetailModalComponent } from '../seller-order-detail-modal/seller-order-detail-modal.component';
import { errorCode, statusOrder } from 'src/app/shared/model/model';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-seller-order-list',
  templateUrl: './seller-order-list.component.html',
  styleUrls: ['./seller-order-list.component.scss'],
})
export class SellerOrderListComponent implements OnInit {
  // dataUser!: IUser;
  type!: string | null;
  listOrderActive$!: Observable<any[]>;
  navTabs = [
    {
      name: 'Tất cả',
      isActive: true,
    },
    {
      name: 'Chờ xác nhận',
      isActive: false,
    },
    {
      name: 'Đang giao hàng',
      isActive: false,
    },
    {
      name: 'Hoàn tất',
      isActive: false,
    },
    {
      name: 'Đơn hủy',
      isActive: false,
    },
  ];
  handleChooseOption(current: string) {
    this.navTabs.forEach((item) => {
      item.isActive = false;
      if (item.name === current) {
        item.isActive = true;
      }
    });
    if (current === 'Tất cả') {
      this.listOrderActive$ = this.authService.dataUser$.pipe(
        switchMap((data) =>
          this.orderService.readAllOrderActiveOfShop(data?.Shop?.id)
        ),
        filter((order) => !!order),
        map((order) => order.DT)
      );
    }
    if (current === 'Đang giao hàng') {
      this.listOrderActive$ = this.authService.dataUser$.pipe(
        switchMap((data) =>
          this.orderService.readAllOrderWithStatusOfShop({
            shopID: data?.Shop?.id,
            offset: 0,
            limit: 10,
            statusID: statusOrder.DELIVERING,
          })
        ),
        filter((order) => !!order),
        map((order) => order.DT)
      );
    }
    if (current === 'Chờ xác nhận') {
      this.listOrderActive$ = this.authService.dataUser$.pipe(
        switchMap((data) =>
          this.orderService.readAllOrderWithStatusOfShop({
            shopID: data?.Shop?.id,
            offset: 0,
            limit: 10,
            statusID: statusOrder.PENDING,
          })
        ),
        filter((order) => !!order),
        map((order) => order.DT)
      );
    }
    if (current === 'Đơn hủy') {
      this.listOrderActive$ = this.authService.dataUser$.pipe(
        switchMap((data) =>
          this.orderService.readAllOrderWithStatusOfShop({
            shopID: data?.Shop?.id,
            offset: 0,
            limit: 10,
            statusID: statusOrder.CANCELLED,
          })
        ),
        filter((order) => !!order),
        map((order) => order.DT)
      );
    }
    if (current === 'Hoàn tất') {
      this.listOrderActive$ = this.authService.dataUser$.pipe(
        switchMap((data) =>
          this.orderService.readAllOrderWithStatusOfShop({
            shopID: data?.Shop?.id,
            offset: 0,
            limit: 10,
            statusID: statusOrder.DELIVERED,
          })
        ),
        filter((order) => !!order),
        map((order) => order.DT)
      );
    }
  }
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
            this.orderService.readAllOrderActiveOfShop(data?.Shop?.id)
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
  handleChooseCancel(orderID: number) {
    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: 'Đơn hàng này sẽ không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0A68FF',
      cancelButtonColor: '#FF424E',
      confirmButtonText: 'Chắc! Hủy nó đi',
      cancelButtonText: 'Hủy',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const rawData = {
          orderID,
          statusID: statusOrder.CANCELLED,
        };
        this.orderService.updateStatusOrder(rawData).subscribe((data) => {
          if (+data.EC === errorCode.SUCCESS) {
            Swal.fire({
              title: 'Đã hủy!',
              text: 'Đơn hàng của bạn đã được hủy.',
              icon: 'success',
              confirmButtonColor: '#0A68FF', // Update the button color
            });
            this.listOrderActive$ = this.authService.dataUser$.pipe(
              switchMap((data) =>
                this.orderService.readAllOrderActiveOfShop(data?.Shop?.id)
              ),
              filter((order) => !!order),
              map((order) => order.DT)
            );
          } else {
            this.toastrService.error(data.EM);
          }
        });
      }
    });
  }
  handleChooseConfirm(orderID: number) {
    const rawData = {
      orderID,
      statusID: statusOrder.DELIVERING,
    };
    this.orderService.updateStatusOrder(rawData).subscribe((data) => {
      if (+data.EC === errorCode.SUCCESS) {
        this.toastrService.success(data.EM);
        this.listOrderActive$ = this.authService.dataUser$.pipe(
          switchMap((data) =>
            this.orderService.readAllOrderActiveOfShop(data?.Shop?.id)
          ),
          filter((order) => !!order),
          map((order) => order.DT)
        );
      } else {
        this.toastrService.error(data.EM);
      }
    });
  }
  formatDate(time: Date) {
    const date = new Date(time);
    return date.toLocaleString('en-GB');
  }
  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    public dialog: MatDialog,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const type = params.get('type');
      this.listOrderActive$ = this.getOrderActiveObservable(type);
    });
  }
  getOrderActiveObservable(type: string | null) {
    if (type && type === 'cancelled') {
      this.handleChooseOption('Đơn hủy');
      return this.authService.dataUser$.pipe(
        switchMap((data) =>
          this.orderService.readAllOrderWithStatusOfShop({
            shopID: data?.Shop?.id,
            offset: 0,
            limit: 10,
            statusID: statusOrder.CANCELLED,
          })
        ),
        filter((order) => !!order),
        map((order) => order.DT)
      );
    } else if (type && type === 'pending') {
      this.handleChooseOption('Chờ xác nhận');
      return this.authService.dataUser$.pipe(
        switchMap((data) =>
          this.orderService.readAllOrderWithStatusOfShop({
            shopID: data?.Shop?.id,
            offset: 0,
            limit: 10,
            statusID: statusOrder.PENDING,
          })
        ),
        filter((order) => !!order),
        map((order) => order.DT)
      );
    } else {
      this.handleChooseOption('Tất cả');
      return this.authService.dataUser$.pipe(
        switchMap((data) =>
          this.orderService.readAllOrderActiveOfShop(data?.Shop?.id)
        ),
        filter((order) => !!order),
        map((order) => order.DT)
      );
    }
  }
}
