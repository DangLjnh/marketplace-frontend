import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartPageComponent } from '../cart-page/cart-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CartFreeShipComponent } from '../cart-free-ship/cart-free-ship.component';
import { CartSellerComponent } from '../cart-seller/cart-seller.component';
import { CartTotalPriceComponent } from '../cart-total-price/cart-total-price.component';
import { IconModule } from 'src/app/shared/UI/icon/icon.module';
@NgModule({
  declarations: [
    CartPageComponent,
    CartFreeShipComponent,
    CartSellerComponent,
    CartTotalPriceComponent,
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,
    MatIconModule,
    MatCheckboxModule,
    IconModule,
  ],
})
export class CartModule {}
