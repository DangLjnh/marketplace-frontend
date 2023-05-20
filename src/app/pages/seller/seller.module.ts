import { SharedModule } from 'src/app/shared/shared.module';
import { IconModule } from 'src/app/shared/UI/icon/icon.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SellerComponent } from 'src/app/layouts/seller/seller.component';
import { HeaderSellerComponent } from 'src/app/layouts/header/header-seller/header-seller.component';
import { SellerPortalComponent } from './feaure/register/seller-portal/seller-portal.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SellerPageComponent } from './feaure/seller-page/seller-page.component';
import { SellerProductComponent } from './feaure/product/seller-product/seller-product.component';
import { MatRadioModule } from '@angular/material/radio';
import { SellerSidebarComponent } from './feaure/seller-sidebar/seller-sidebar.component';
import { SellerPortalLayoutComponent } from 'src/app/layouts/seller-portal-layout/seller-portal-layout.component';
import { SellerHintComponent } from './feaure/product/seller-hint/seller-hint.component';
import { SellerHintTotalComponent } from './feaure/product/seller-hint-total/seller-hint-total.component';
import { SellerPortalWelcomeComponent } from './feaure/register/seller-portal-welcome/seller-portal-welcome.component';
import { SellerPortalFormComponent } from './feaure/register/seller-portal-form/seller-portal-form.component';
import { SellerProductListComponent } from './feaure/product/seller-product-list/seller-product-list.component';

@NgModule({
  declarations: [
    SellerComponent,
    HeaderSellerComponent,
    SellerPortalComponent,
    SellerPortalFormComponent,
    SellerPortalWelcomeComponent,
    SellerPageComponent,
    SellerProductComponent,
    SellerHintComponent,
    SellerHintTotalComponent,
    SellerSidebarComponent,
    SellerPortalLayoutComponent,
    SellerProductListComponent,
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
    MatRadioModule,
  ],
})
export class SellerModule {}
