import { SharedModule } from 'src/app/shared/shared.module';
import { IconModule } from 'src/app/shared/UI/icon/icon.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SellerDiscountListComponent } from './feaure/discount/seller-discount-list/seller-discount-list.component';
import { SellerDiscountNewComponent } from './feaure/discount/seller-discount-new/seller-discount-new.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { SellerDiscountProductModalComponent } from './feaure/discount/seller-discount-product-modal/seller-discount-product-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { SellerProductCategoryModalComponent } from './feaure/product/seller-product-category-modal/seller-product-category-modal.component';
import { SellerOrderListComponent } from './feaure/order/seller-order-list/seller-order-list.component';
import { SellerOrderListCancelComponent } from './feaure/order/seller-order-list-cancel/seller-order-list-cancel.component';
import { SellerOrderDetailModalComponent } from './feaure/order/seller-order-detail-modal/seller-order-detail-modal.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SellerProfileComponent } from './feaure/profile/seller-profile/seller-profile.component';
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
    SellerDiscountListComponent,
    SellerDiscountNewComponent,
    SellerDiscountProductModalComponent,
    SellerProductCategoryModalComponent,
    SellerOrderListComponent,
    SellerOrderListCancelComponent,
    SellerOrderDetailModalComponent,
    SellerProfileComponent,
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTooltipModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    FormsModule,
    MatPaginatorModule,
  ],
})
export class SellerModule {}
