import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutPageComponent } from '../checkout-page/checkout-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartAddressComponent } from 'src/app/pages/cart/feature/cart-address/cart-address.component';

@NgModule({
  declarations: [CheckoutPageComponent, CartAddressComponent],
  imports: [CommonModule, CheckoutRoutingModule, SharedModule],
})
export class CheckoutModule {}
