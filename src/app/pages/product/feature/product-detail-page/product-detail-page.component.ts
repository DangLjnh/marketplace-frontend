import { ShopService } from './../../../shop/data-access/shop.service';
import { pluck, tap, switchMap, filter, Observable, map } from 'rxjs';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
// import Swiper core and required modules
import SwiperCore, { Swiper, SwiperOptions, Virtual } from 'swiper';

// install Swiper modules
SwiperCore.use([Virtual]);
import { SwiperComponent } from 'swiper/angular';
import { ProductService } from '../../data-access/product.service';
import {
  ICart,
  IProduct,
  IProductPriceOption,
  IProductType,
  IUser,
  TProductFilter,
} from 'src/app/shared/model/interface';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/pages/cart/data-access/cart.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ProductComparePriceModalComponent } from '../product-compare-price-modal/product-compare-price-modal.component';
import { timeSince } from 'src/app/shared/utils/function';
import { CategoryService } from 'src/app/pages/category/data-access/category.service';
import { ProductDetailChooseCartModalComponent } from '../product-detail-choose-cart-modal/product-detail-choose-cart-modal.component';
@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss'],
})
export class ProductDetailPageComponent implements AfterViewInit, OnInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  dataUser!: IUser;
  dataProduct!: IProduct;
  valueCounter: number = 1;
  slidesPerView: number = 6;
  cartDefault!: ICart;
  isStart!: boolean;
  isActiveArrow!: boolean;
  isEnd!: any;
  notChooseOption: boolean = true;
  chooseFirstOption?: TProductFilter;
  chooseSecondOption?: TProductFilter;
  listFilterAfterChoose: TProductFilter[] = [];
  listFilterCloneAfterChoose: TProductFilter[] = [];
  currentChooseOptions: any[] = [];
  optionResult!: any;
  isChooseSameOption!: boolean;
  isChooseSameType!: boolean;
  getPriceLow!: number;
  listComparePrice!: any;
  listProductSameShop$!: Observable<IProduct[]>;
  listProductSameCategoryFilter$!: Observable<IProduct[]>;
  config: SwiperOptions = {
    slidesPerView: this.slidesPerView,
    spaceBetween: 15,
    slidesPerGroup: 6, // Set number of slides to be grouped together
  };

  handleChooseOptions({
    option,
    index,
    type,
  }: {
    option: TProductFilter;
    index: number;
    type: IProductType;
  }) {
    this.notChooseOption = false;

    this.isChooseSameType = this.currentChooseOptions.some(
      (item) => item.idType === type.id
    );

    if (this.currentChooseOptions.length < 2) {
      const isChooseSameOption = this.currentChooseOptions.some(
        (item) => item.idOption === option.id
      );

      if (this.isChooseSameType) {
        this.currentChooseOptions = this.currentChooseOptions.map((item) =>
          item.idType === type.id ? { ...item, idOption: option.id } : item
        );
      }

      if (!isChooseSameOption && !this.isChooseSameType) {
        this.currentChooseOptions.push({
          idOption: option.id,
          idType: type.id,
        });
      }
    } else if (this.isChooseSameType) {
      this.currentChooseOptions = this.currentChooseOptions.map((item) =>
        item.idType === type.id ? { ...item, idOption: option.id } : item
      );
    } else {
      this.currentChooseOptions = [];
    }

    this.dataProduct.Product_Price_Options.forEach((priceOption) => {
      if (
        this.currentChooseOptions.length === 2 &&
        this.currentChooseOptions[0].idOption === priceOption.firstFilter.id &&
        this.currentChooseOptions[1].idOption === priceOption.secondFilter.id
      ) {
        this.optionResult = priceOption;
      }
      if (
        this.currentChooseOptions.length === 1 &&
        this.currentChooseOptions[0].idOption === priceOption.firstFilter.id &&
        priceOption.secondFilter === null
      ) {
        this.optionResult = priceOption;
      }
      if (option.name_filter === priceOption.firstFilter.name_filter) {
        this.listFilterAfterChoose.push(priceOption.secondFilter);
        this.listFilterCloneAfterChoose = JSON.parse(
          JSON.stringify(this.listFilterAfterChoose)
        );
      }
    });

    if (this.dataProduct.Product_Types[1]) {
      this.listFilterAfterChoose = [];
      this.dataProduct.Product_Types[1].Product_Filters =
        this.listFilterCloneAfterChoose;
    }
  }

  slideNext() {
    this.swiper?.swiperRef.slideNext();
    if (this.swiper?.swiperRef.activeIndex !== undefined) {
      this.isEnd = this.swiper.swiperRef.isEnd;
      this.isStart = this.swiper.swiperRef.isBeginning;
    }
  }
  slidePrev() {
    this.swiper?.swiperRef.slidePrev();
    if (this.swiper?.swiperRef.activeIndex !== undefined) {
      this.isEnd = this.swiper.swiperRef.isEnd;
      this.isStart = this.swiper.swiperRef.isBeginning;
    }
  }
  handleAddToCart() {
    const rawCartData = {
      quantity: this.valueCounter,
      productID: this.dataProduct.id,
      productPriceOptionID: this.optionResult?.id ?? null,
      shopID: this.dataProduct.shopID,
      userID: this.dataUser.id,
      cartID: this.cartDefault.id,
    };
    this.cartService.createCartItem(rawCartData).subscribe((data) => {
      if (+data.EC === 1 || +data.EC === -1) {
        this.toastrService.error(data.EM);
      }
      if (+data.EC === 0) {
        this.toastrService.success(data.EM);
      }
    });
  }
  openModalComparePrice(name: string) {
    this.dialog.open(ProductComparePriceModalComponent, {
      data: {
        name: name,
      },
    });
  }
  openModalChooseCart() {
    if (
      this.notChooseOption &&
      this.dataProduct.Product_Price_Options.length > 0
    ) {
      this.toastrService.error('Bạn phải chọn phân loại hàng trước');
    } else {
      const rawCartData = {
        quantity: this.valueCounter,
        productID: this.dataProduct.id,
        productPriceOptionID: this.optionResult?.id ?? null,
        shopID: this.dataProduct.shopID,
        userID: this.dataUser.id,
        cartID: this.cartDefault.id,
      };
      this.dialog.open(ProductDetailChooseCartModalComponent, {
        data: rawCartData,
      });
    }
  }
  onCountPlus(num: number) {
    this.valueCounter = num + 1;
  }
  onCountMinus(num: number) {
    if (this.valueCounter !== 1) {
      this.valueCounter = num - 1;
    }
  }
  scrollTop() {
    window.scrollTo(0, 0);
  }
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private readonly route: ActivatedRoute,
    private toastrService: ToastrService,
    private categoryService: CategoryService,
    private cartService: CartService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.authService.dataUser$.subscribe((data: IUser) => {
      this.dataUser = data;
      data?.Carts.filter((data) => {
        if (data.isGroupCart === false) this.cartDefault = data;
      });
    });
    const productID = this.route.snapshot.paramMap.get('id');
    this.route.params
      .pipe(
        pluck('id'),
        switchMap((id) => this.productService.readSingleProduct(id)),
        filter((product) => !!product)
      )
      .subscribe((data) => {
        this.dataProduct = data.DT;
        if (this.dataProduct.Shop) {
          this.dataProduct.Shop.createdAt = timeSince(
            new Date(data.DT.Shop.createdAt)
          );
        }
        const nameProduct = this.dataProduct.Product_Detail.name;
        this.productService
          .searchSameProduct({ name: nameProduct })
          .subscribe((data) => {
            this.listComparePrice = data.DT;
          });

        this.dataProduct.Product_Price_Options.forEach(
          (item: IProductPriceOption, index) => {
            if (index == 0) {
              this.getPriceLow = item.price;
            }
            if (this.getPriceLow > item.price) {
              this.getPriceLow = item.price;
            }
          }
        );

        this.listProductSameCategoryFilter$ = this.categoryService
          .readAllProductByCategoryFilter(data.DT.categoryFilterID)
          .pipe(
            map((product) => product.DT),
            filter((product) =>
              product.filter((item: IProduct) => item.id !== Number(productID))
            )
          );

        this.listProductSameShop$ = this.productService
          .readAllProductOfShop(data.DT.Shop.id)
          .pipe(map((data) => data.DT));

        if (data.DT.Product_Price_Options.length > 0) {
          this.notChooseOption = true;
        } else {
          this.notChooseOption = false;
        }
      });
  }
  ngAfterViewInit(): void {
    if (this.swiper?.swiperRef.activeIndex !== undefined) {
      this.isStart = this.swiper.swiperRef.isBeginning;
    }
  }
}
