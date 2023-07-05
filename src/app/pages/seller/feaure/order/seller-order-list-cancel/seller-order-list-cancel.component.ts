import { Component } from '@angular/core';

@Component({
  selector: 'app-seller-order-list-cancel',
  templateUrl: './seller-order-list-cancel.component.html',
  styleUrls: ['./seller-order-list-cancel.component.scss'],
})
export class SellerOrderListCancelComponent {
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
}
