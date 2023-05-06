import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { HeaderComponent } from '../layouts/header/header-home/header.component';
import { HeaderTooltipCartComponent } from '../layouts/header/header-tooltip-cart/header-tooltip-cart.component';
import { FooterComponent } from '../layouts/footer/footer.component';
import { ButtonComponent } from './UI/button/button.component';
import { CartAddressComponent } from '../pages/cart/feature/cart-address/cart-address.component';
import { ProductItemComponent } from './UI/product/product-item/product-item.component';
import { IconModule } from './UI/icon/icon.module';
import { InputSearchComponent } from './UI/input-search/input-search.component';
import { LayoutSharedComponent } from './UI/layout/layout-shared/layout-shared.component';
import { SharedRoutingModule } from './shared-routing.module';
import { InputCounterComponent } from './UI/input-counter/input-counter.component';
import { ButtonOptionComponent } from './UI/button/button-option/button-option.component';
import { StarListComponent } from './UI/star-list/star-list.component';
import { SwiperListComponent } from './UI/section/swiper-list/swiper-list.component';
import { SwiperModule } from 'swiper/angular';
import { ProductSectionComponent } from './UI/product/product-section/product-section.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HeaderTooltipCartComponent,
    ButtonComponent,
    CartAddressComponent,
    ProductItemComponent,
    InputSearchComponent,
    LayoutSharedComponent,
    InputCounterComponent,
    ButtonOptionComponent,
    StarListComponent,
    SwiperListComponent,
    ProductSectionComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatBadgeModule,
    MatInputModule,
    IconModule,
    SharedRoutingModule,
    SwiperModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HeaderTooltipCartComponent,
    ButtonComponent,
    CartAddressComponent,
    ProductItemComponent,
    InputSearchComponent,
    LayoutSharedComponent,
    InputCounterComponent,
    ButtonOptionComponent,
    StarListComponent,
    SwiperListComponent,
    ProductSectionComponent,
  ],
})
export class SharedModule {}
