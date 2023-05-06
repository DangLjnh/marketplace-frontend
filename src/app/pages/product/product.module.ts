import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { ProductRoutingModule } from './product-routing.module';
import { ProductDetailPageComponent } from './feature/product-detail-page/product-detail-page.component';
import { IconModule } from 'src/app/shared/UI/icon/icon.module';
import { ProductCategoryOptionComponent } from './feature/product-category-option/product-category-option.component';

@NgModule({
  declarations: [ProductDetailPageComponent, ProductCategoryOptionComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SwiperModule,
    SharedModule,
    IconModule,
  ],
})
export class ProductModule {}
