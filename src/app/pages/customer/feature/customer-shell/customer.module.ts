import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerEditPageComponent } from '../customer-edit-page/customer-edit-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IconModule } from 'src/app/shared/UI/icon/icon.module';
import { MatRadioModule } from '@angular/material/radio';
import { CustomerComponent } from 'src/app/layouts/customer/customer.component';
import { CustomerSidebarComponent } from '../customer-sidebar/customer-sidebar.component';
import { CustomerChangePasswordComponent } from '../customer-change-password/customer-change-password.component';
import { CustomerAddressComponent } from '../customer-address/customer-address.component';
import { CustomerPurchaseComponent } from '../customer-purchase/customer-purchase.component';
@NgModule({
  declarations: [
    CustomerEditPageComponent,
    CustomerComponent,
    CustomerSidebarComponent,
    CustomerChangePasswordComponent,
    CustomerAddressComponent,
    CustomerPurchaseComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    IconModule,
    MatRadioModule,
  ],
})
export class CustomerModule {}
