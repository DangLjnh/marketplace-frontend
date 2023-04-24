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

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HeaderTooltipCartComponent,
    ButtonComponent,
    CartAddressComponent,
    ProductItemComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatBadgeModule,
    MatInputModule,
    IconModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HeaderTooltipCartComponent,
    ButtonComponent,
    CartAddressComponent,
    ProductItemComponent,
  ],
})
export class SharedModule {}
