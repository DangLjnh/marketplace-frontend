import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IconModule } from 'src/app/shared/UI/icon/icon.module';
import { CartPageComponent } from './feature/cart-page/cart-page.component';
import { CartFreeShipComponent } from './feature/cart-free-ship/cart-free-ship.component';
import { CartSellerComponent } from './feature/cart-seller/cart-seller.component';
import { CartTotalPriceComponent } from './feature/cart-total-price/cart-total-price.component';
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
