import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { ProductService } from '../../../data-access/product.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/shared/model/interface';

@Component({
  selector: 'app-seller-product-list',
  templateUrl: './seller-product-list.component.html',
  styleUrls: ['./seller-product-list.component.scss'],
})
export class SellerProductListComponent implements OnInit {
  productList!: IProduct[];

  navTabs = [
    {
      name: 'Tất cả',
    },
    {
      name: 'Đang hoạt động',
    },
    {
      name: 'Hết hàng',
    },
    {
      name: 'Chờ duyệt',
    },
    {
      name: 'Vi phạm',
    },
  ];

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.authService.dataUser$.subscribe((data) => {
      this.productService
        .readAllProductOfShop(data?.Shop?.id)
        .subscribe((data) => {
          console.log(
            '🚀 ~ file: seller-product-list.component.ts:43 ~ SellerProductListComponent ~ .subscribe ~ data:',
            data
          );
          this.productList = data.DT;
        });
    });
  }
}
