import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss'],
})
export class AdminSidebarComponent {
  sidebars: any = [
    {
      title: 'Quản lý người dùng',
      img: '',
      submenus: [
        {
          name: 'Tất cả người dùng',
          url: '/admin/portal/user',
          isActive: false,
        },
      ],
    },
    {
      title: 'Quản lý sản phẩm',
      submenus: [
        {
          name: 'Tất cả sản phẩm',
          url: '/admin/portal/product',
          isActive: false,
        },
      ],
    },
    {
      title: 'Quản lý danh mục',
      submenus: [
        {
          name: 'Tất cả danh mục',
          url: '/admin/portal/category',
          isActive: false,
        },
        {
          name: 'Thêm danh mục',
          url: '/admin/portal/category/new',
          isActive: false,
        },
      ],
    },
    {
      title: 'Phân quyền người dùng',
      submenus: [
        {
          name: 'Tất cả nhóm quyền',
          url: '/admin/portal/group',
          isActive: false,
        },
        {
          name: 'Tạo nhóm quyền',
          url: '/admin/portal/group/new',
          isActive: false,
        },
      ],
    },
    {
      title: 'Dữ liệu',
      submenus: [
        {
          name: 'Doanh thu',
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
