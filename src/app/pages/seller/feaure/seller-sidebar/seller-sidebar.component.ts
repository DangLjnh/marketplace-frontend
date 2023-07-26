import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-sidebar',
  templateUrl: './seller-sidebar.component.html',
  styleUrls: ['./seller-sidebar.component.scss'],
})
export class SellerSidebarComponent {
  sidebars: any = [
    {
      title: 'Quản lý đơn hàng',
      img: '',
      submenus: [
        {
          name: 'Tất cả đơn hàng',
          url: '/seller/portal/order/list',
          isActive: false,
        },
        {
          name: 'Chờ xác nhận',
          url: '/seller/portal/order/list',
          queryKey: 'type',
          queryParams: 'pending',
          isActive: false,
        },
        {
          name: 'Đơn hủy',
          url: '/seller/portal/order/list',
          queryKey: 'type',
          queryParams: 'cancelled',
          isActive: false,
        },
      ],
    },
    {
      title: 'Quản lý sản phẩm',
      submenus: [
        {
          name: 'Tất cả sản phẩm',
          url: '/seller/portal/product/list',
          isActive: false,
        },
        {
          name: 'Thêm sản phẩm',
          url: '/seller/portal/product/new',
          isActive: false,
        },
        {
          name: 'Sản phẩm chờ duyệt',
          url: '/seller/portal/product/list',
          queryKey: 'type',
          queryParams: 'pending',
          isActive: false,
        },
      ],
    },
    {
      title: 'Dữ liệu',
      submenus: [
        {
          name: 'Doanh thu',
          url: '/seller/portal/bill/list',
          isActive: false,
        },
        {
          name: 'Biểu đồ doanh thu',
          url: '/seller/portal/bill/chart',
          isActive: false,
        },
      ],
    },
    {
      title: 'Quản lý Shop',
      submenus: [
        // {
        //   name: 'Đánh giá Shop',
        //   url: '',
        //   isActive: false,
        // },
        {
          name: 'Hồ sơ Shop',
          url: '/seller/portal/profile',
          isActive: false,
        },
        // {
        //   name: 'Tài khoản',
        //   url: '',
        //   isActive: false,
        // },
      ],
    },
    {
      title: 'Quản lý giảm giá',
      submenus: [
        {
          name: 'Danh sách giảm giá',
          url: '/seller/portal/discount/list',
          isActive: false,
        },
        {
          name: 'Thêm giảm giá sản phẩm',
          url: '/seller/portal/discount/new',
          isActive: false,
        },
      ],
    },
  ];
  handleChoose(sub: any) {
    this.sidebars.forEach((item: any) => {
      item.submenus.forEach((item: any) => {
        item.isActive = false;
        if (item.name === sub.name) {
          item.isActive = true;
        }
      });
    });
  }
  getQueryParamsObject(queryKey: string, queryParams: string): any {
    const paramsObject: any = {};
    paramsObject[queryKey] = queryParams;
    return paramsObject;
  }
}
