import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { ProductService } from '../../../data-access/product.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IProduct, IUser } from 'src/app/shared/model/interface';
import { statusProduct } from 'src/app/shared/model/model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-product-list',
  templateUrl: './seller-product-list.component.html',
  styleUrls: ['./seller-product-list.component.scss'],
})
export class SellerProductListComponent implements OnInit {
  dataUser!: IUser;
  productList!: any[];
  productOptions!: any[];
  currentOption: string = 'Tất cả';
  navTabs = [
    {
      name: 'Tất cả',
      isActive: true,
    },
    {
      name: 'Đang hoạt động',
      isActive: false,
    },
    // {
    //   name: 'Hết hàng',
    //   isActive: false,
    // },
    {
      name: 'Chờ duyệt',
      isActive: false,
    },
    {
      name: 'Vi phạm',
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
      this.productService
        .readAllProductOfShop({
          shopID: this.dataUser.Shop?.id,
          offset: 0,
          limit: 10,
        })
        .subscribe((data) => {
          this.productList = data.DT;
        });
    }
    if (current === 'Đang hoạt động') {
      this.productService
        .readAllProductWithStatusOfShop({
          shopID: this.dataUser.Shop.id,
          statusID: statusProduct.ACTIVE,
          offset: 0,
          limit: 10,
        })
        .subscribe((data) => {
          this.productList = data.DT;
        });
    }
    if (current === 'Chờ duyệt') {
      this.productService
        .readAllProductWithStatusOfShop({
          shopID: this.dataUser.Shop.id,
          statusID: statusProduct.PENDING,
          offset: 0,
          limit: 10,
        })
        .subscribe((data) => {
          this.productList = data.DT;
        });
    }
    if (current === 'Vi phạm') {
      this.productService
        .readAllProductWithStatusOfShop({
          shopID: this.dataUser.Shop.id,
          statusID: statusProduct.BAN,
          offset: 0,
          limit: 10,
        })
        .subscribe((data) => {
          this.productList = data.DT;
        });
    }
  }

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const type = params.get('type');
      if (type === 'pending') {
        this.handleChooseOption('Chờ duyệt');
        this.productService
          .readAllProductWithStatusOfShop({
            shopID: this.dataUser.Shop.id,
            statusID: statusProduct.PENDING,
            offset: 0,
            limit: 10,
          })
          .subscribe((data) => {
            this.productList = data.DT;
          });
      } else {
        this.authService.dataUser$.subscribe((data) => {
          this.dataUser = data;
          this.productService
            .readAllProductOfShop({
              shopID: data?.Shop?.id,
              offset: 0,
              limit: 10,
            })
            .subscribe((data) => {
              this.productList = data.DT;
            });
        });
      }
    });
  }
}
