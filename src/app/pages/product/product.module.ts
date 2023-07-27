import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { ProductRoutingModule } from './product-routing.module';
import { ProductDetailPageComponent } from './feature/product-detail-page/product-detail-page.component';
import { IconModule } from 'src/app/shared/UI/icon/icon.module';
import { ProductCategoryOptionComponent } from './feature/product-category-option/product-category-option.component';
import { ProductComparePriceModalComponent } from './feature/product-compare-price-modal/product-compare-price-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductDetailChooseCartModalComponent } from './feature/product-detail-choose-cart-modal/product-detail-choose-cart-modal.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderChooseCartModalComponent } from './feature/header-choose-cart-modal/header-choose-cart-modal.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ProductDetailPageComponent,
    ProductCategoryOptionComponent,
    ProductComparePriceModalComponent,
    ProductDetailChooseCartModalComponent,
    HeaderChooseCartModalComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SwiperModule,
    SharedModule,
    IconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTooltipModule,
  ],
  exports: [HeaderChooseCartModalComponent],
})
export class ProductModule {}
