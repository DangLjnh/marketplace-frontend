import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { IconModule } from 'src/app/shared/UI/icon/icon.module';
import { MatRadioModule } from '@angular/material/radio';
import { CustomerComponent } from 'src/app/layouts/customer/customer.component';
import { CustomerEditPageComponent } from './feature/customer-edit-page/customer-edit-page.component';
import { CustomerChangePasswordComponent } from './feature/customer-change-password/customer-change-password.component';
import { CustomerSidebarComponent } from './feature/customer-sidebar/customer-sidebar.component';
import { CustomerAddressComponent } from './feature/customer-address/customer-address.component';
import { CustomerPurchaseComponent } from './feature/customer-purchase/customer-purchase.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { CustomerAddressModalComponent } from './feature/customer-address-modal/customer-address-modal.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CheckoutAddressModalComponent } from './feature/checkout-address-modal/checkout-address-modal.component';
@NgModule({
  declarations: [
    CustomerEditPageComponent,
    CustomerComponent,
    CustomerSidebarComponent,
    CustomerChangePasswordComponent,
    CustomerAddressComponent,
    CustomerPurchaseComponent,
    CustomerAddressModalComponent,
    CheckoutAddressModalComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    IconModule,
    MatRadioModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatStepperModule,
    MatTooltipModule,
  ],
})
export class CustomerModule {}
