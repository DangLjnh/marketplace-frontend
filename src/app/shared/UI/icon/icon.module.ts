import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDiscountComponent } from './icon-discount/icon-discount.component';
import { IconCheckComponent } from './icon-check/icon-check.component';
import { IconFastComponent } from './icon-fast/icon-fast.component';
import { IconGoogleComponent } from './icon-google/icon-google.component';
import { IconFacebookComponent } from './icon-facebook/icon-facebook.component';
import { IconStoreComponent } from './icon-store/icon-store.component';
import { IconAllCatComponent } from './icon-all-cat/icon-all-cat.component';
import { IconArrowRightComponent } from './icon-arrow-right/icon-arrow-right.component';
import { IconAccountComponent } from './icon-account/icon-account.component';
import { IconNotificationComponent } from './icon-notification/icon-notification.component';
import { IconOrderComponent } from './icon-order/icon-order.component';
import { IconCartComponent } from './icon-cart/icon-cart.component';
import { IconLocationComponent } from './icon-location/icon-location.component';
import { IconLockComponent } from './icon-lock/icon-lock.component';

@NgModule({
  declarations: [
    IconDiscountComponent,
    IconCheckComponent,
    IconFastComponent,
    IconGoogleComponent,
    IconFacebookComponent,
    IconStoreComponent,
    IconAllCatComponent,
    IconArrowRightComponent,
    IconAccountComponent,
    IconNotificationComponent,
    IconOrderComponent,
    IconCartComponent,
    IconLocationComponent,
    IconLockComponent,
  ],
  imports: [CommonModule],
  exports: [
    IconDiscountComponent,
    IconCheckComponent,
    IconFastComponent,
    IconGoogleComponent,
    IconFacebookComponent,
    IconStoreComponent,
    IconAllCatComponent,
    IconArrowRightComponent,
    IconAccountComponent,
    IconNotificationComponent,
    IconOrderComponent,
    IconCartComponent,
    IconLocationComponent,
    IconLockComponent,
  ],
})
export class IconModule {}
