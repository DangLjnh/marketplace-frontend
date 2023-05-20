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
