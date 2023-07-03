import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutPageComponent } from './feature/checkout-page/checkout-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatRadioModule } from '@angular/material/radio';
import { CheckoutPackageComponent } from './feature/checkout-package/checkout-package.component';
import { CheckoutPaymentComponent } from './feature/checkout-payment/checkout-payment.component';
import { CheckoutOrderComponent } from './feature/checkout-order/checkout-order.component';
import { IconModule } from 'src/app/shared/UI/icon/icon.module';
import { CheckoutPayMomoOrderComponent } from './feature/checkout-pay-momo-order/checkout-pay-momo-order.component';
import { MatDialogModule } from '@angular/material/dialog';
import { QrCodeModule } from 'ng-qrcode';
@NgModule({
  declarations: [
    CheckoutPageComponent,
    CheckoutPackageComponent,
    CheckoutPaymentComponent,
    CheckoutOrderComponent,
    CheckoutPayMomoOrderComponent,
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
    MatRadioModule,
    IconModule,
    MatDialogModule,
    QrCodeModule,
  ],
})
export class CheckoutModule {}
