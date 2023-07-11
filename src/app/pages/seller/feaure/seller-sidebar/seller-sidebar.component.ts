import { Component } from '@angular/core';

@Component({
  selector: 'app-seller-sidebar',
  templateUrl: './seller-sidebar.component.html',
  styleUrls: ['./seller-sidebar.component.scss'],
})
export class SellerSidebarComponent {
  sidebars = [
    {
      title: 'Quản lý đơn hàng',
      img: '',
      submenus: [
        {
          name: 'Tất cả đơn hàng',
          url: '/seller/portal/order/list',
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
          url: '/seller/portal/product/list',
        },
        {
          name: 'Thêm sản phẩm',
          url: '/seller/portal/product/new',
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
          name: 'Danh sách giảm giá',
          url: '/seller/portal/discount/list',
        },
        {
          name: 'Thêm giảm giá sản phẩm',
          url: '/seller/portal/discount/new',
        },
      ],
    },
  ];
}
