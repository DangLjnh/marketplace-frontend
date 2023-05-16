import { Component } from '@angular/core';

@Component({
  selector: 'app-seller-page',
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.scss'],
})
export class SellerPageComponent {
  sidebars = [
    {
      title: 'Quản lý đơn hàng',
      img: '',
      submenus: [
        {
          name: 'Tất cả đơn hàng',
          url: '',
        },
        {
          name: 'Đơn hủy',
          url: '',
        },
        {
          name: 'Trả hàng/Hoàn tiền',
          url: '',
        },
      ],
    },
    {
      title: 'Quản lý sản phẩm',
      submenus: [
        {
          name: 'Tất cả sản phẩm',
          url: '',
        },
        {
          name: 'Thêm sản phẩm',
          url: '',
        },
        {
          name: 'Sản phẩm chờ duyệt',
          url: '',
        },
      ],
    },
    {
      title: 'Dữ liệu',
      submenus: [
        {
          name: 'Doanh thu',
          url: '',
        },
      ],
    },
    {
      title: 'Quản lý Shop',
      submenus: [
        {
          name: 'Đánh giá Shop',
          url: '',
        },
        {
          name: 'Hồ sơ Shop',
          url: '',
        },
        {
          name: 'Tài khoản',
          url: '',
        },
      ],
    },
    {
      title: 'Quản lý giảm giá',
      submenus: [
        {
          name: 'Giảm giá phần trăm',
          url: '',
        },
        {
          name: 'Mã giảm giá',
          url: '',
        },
      ],
    },
  ];
}
