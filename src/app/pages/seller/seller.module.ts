import { SharedModule } from 'src/app/shared/shared.module';
import { IconModule } from 'src/app/shared/UI/icon/icon.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SellerComponent } from 'src/app/layouts/seller/seller.component';
import { HeaderSellerComponent } from 'src/app/layouts/header/header-seller/header-seller.component';
import { SellerPortalComponent } from './feaure/seller-portal/seller-portal.component';
import { SellerPortalFormComponent } from './feaure/seller-portal-form/seller-portal-form.component';
import { SellerPortalWelcomeComponent } from './feaure/seller-portal-welcome/seller-portal-welcome.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SellerPageComponent } from './feaure/seller-page/seller-page.component';
import { SellerProductComponent } from './feaure/seller-product/seller-product.component';

@NgModule({
  declarations: [
    SellerComponent,
    HeaderSellerComponent,
    SellerPortalComponent,
    SellerPortalFormComponent,
    SellerPortalWelcomeComponent,
    SellerPageComponent,
    SellerProductComponent,
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    SharedModule,
    IconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
})
export class SellerModule {}
