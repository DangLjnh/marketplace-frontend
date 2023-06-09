import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerEditPageComponent } from './feature/customer-edit-page/customer-edit-page.component';
import { CustomerComponent } from 'src/app/layouts/customer/customer.component';
import { CustomerChangePasswordComponent } from './feature/customer-change-password/customer-change-password.component';
import { CustomerAddressComponent } from './feature/customer-address/customer-address.component';
import { CustomerPurchaseComponent } from './feature/customer-purchase/customer-purchase.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      { path: 'account/edit', component: CustomerEditPageComponent },
      { path: 'account/password', component: CustomerChangePasswordComponent },
      { path: 'account/address', component: CustomerAddressComponent },
      { path: 'account/purchase', component: CustomerPurchaseComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
