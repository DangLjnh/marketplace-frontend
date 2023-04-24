import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutPageComponent } from '../checkout-page/checkout-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatRadioModule } from '@angular/material/radio';
import { CheckoutPackageComponent } from '../checkout-package/checkout-package.component';
import { CheckoutPaymentComponent } from '../checkout-payment/checkout-payment.component';
import { CheckoutOrderComponent } from '../checkout-order/checkout-order.component';
import { IconModule } from 'src/app/shared/UI/icon/icon.module';
@NgModule({
  declarations: [
    CheckoutPageComponent,
    CheckoutPackageComponent,
    CheckoutPaymentComponent,
    CheckoutOrderComponent,
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
    MatRadioModule,
    IconModule,
  ],
})
export class CheckoutModule {}
