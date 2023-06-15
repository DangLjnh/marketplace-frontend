import { pluck, tap, switchMap, filter } from 'rxjs';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
// import Swiper core and required modules
import SwiperCore, { Swiper, SwiperOptions, Virtual } from 'swiper';

// install Swiper modules
SwiperCore.use([Virtual]);
import { SwiperComponent } from 'swiper/angular';
import { ProductService } from '../../data-access/product.service';
import { ICart, IProduct, IUser } from 'src/app/shared/model/interface';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/pages/cart/data-access/cart.service';
import { ToastrService } from 'ngx-toastr';
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
  config: SwiperOptions = {
    slidesPerView: this.slidesPerView,
    spaceBetween: 15,
    slidesPerGroup: 6, // Set number of slides to be grouped together
  };
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
  onCountPlus(num: number) {
    this.valueCounter = num + 1;
  }
  onCountMinus(num: number) {
    if (this.valueCounter !== 1) {
      this.valueCounter = num - 1;
    }
  }
  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private readonly route: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.authService.dataUser$.subscribe((data: IUser) => {
      this.dataUser = data;
      data?.Carts.filter((data) => {
        if (data.isGroupCart === false) this.cartDefault = data;
      });
    });
    this.route.params
      .pipe(
        pluck('id'),
        switchMap((id) => this.productService.readSingleProduct(id)),
        filter((product) => !!product)
      )
      .subscribe((data) => {
        console.log(
          '🚀 ~ file: product-detail-page.component.ts:95 ~ ProductDetailPageComponent ~ .subscribe ~ data:',
          data.DT
        );
        this.dataProduct = data.DT;
      });
  }
  ngAfterViewInit(): void {
    if (this.swiper?.swiperRef.activeIndex !== undefined) {
      this.isStart = this.swiper.swiperRef.isBeginning;
    }
  }
}
