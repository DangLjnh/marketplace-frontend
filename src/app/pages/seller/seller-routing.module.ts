import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from 'src/app/layouts/seller/seller.component';
import { SellerPortalComponent } from './feaure/register/seller-portal/seller-portal.component';
import { SellerPageComponent } from './feaure/seller-page/seller-page.component';
import { SellerProductComponent } from './feaure/product/seller-product/seller-product.component';
import { SellerPortalLayoutComponent } from 'src/app/layouts/seller-portal-layout/seller-portal-layout.component';
import { SellerPortalWelcomeComponent } from './feaure/register/seller-portal-welcome/seller-portal-welcome.component';
import { SellerPortalFormComponent } from './feaure/register/seller-portal-form/seller-portal-form.component';
import { SellerProductListComponent } from './feaure/product/seller-product-list/seller-product-list.component';
import { SellerGuard } from './data-access/seller/seller.guard';
import { SellerDiscountListComponent } from './feaure/discount/seller-discount-list/seller-discount-list.component';
import { SellerDiscountNewComponent } from './feaure/discount/seller-discount-new/seller-discount-new.component';
import { SellerOrderListComponent } from './feaure/order/seller-order-list/seller-order-list.component';

const routes: Routes = [
  {
    path: '',
    component: SellerComponent,
    canActivate: [SellerGuard],
    children: [
      {
        path: '',
        component: SellerPageComponent,
      },
      {
        path: 'portal',
        component: SellerPortalLayoutComponent,
        children: [
          {
            path: 'product/list',
            component: SellerProductListComponent,
          },
          {
            path: 'order/list',
            component: SellerOrderListComponent,
          },
          {
            path: 'discount/list',
            component: SellerDiscountListComponent,
          },
          {
            path: 'discount/new',
            component: SellerDiscountNewComponent,
          },
          {
            path: 'discount/edit/:id',
            component: SellerDiscountNewComponent,
          },
        ],
      },
      {
        path: 'portal/product/new',
        component: SellerProductComponent,
      },
      {
        path: 'portal/product/:id',
        component: SellerProductComponent,
      },
      {
        path: 'portal/onboarding',
        component: SellerPortalComponent,
        children: [
          {
            path: '',
            component: SellerPortalWelcomeComponent,
          },
          {
            path: 'form',
            component: SellerPortalFormComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
