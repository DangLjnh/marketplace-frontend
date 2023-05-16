import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from 'src/app/layouts/seller/seller.component';
import { SellerPortalComponent } from './feaure/seller-portal/seller-portal.component';
import { SellerPortalFormComponent } from './feaure/seller-portal-form/seller-portal-form.component';
import { SellerPortalWelcomeComponent } from './feaure/seller-portal-welcome/seller-portal-welcome.component';
import { SellerPageComponent } from './feaure/seller-page/seller-page.component';
import { SellerProductComponent } from './feaure/seller-product/seller-product.component';

const routes: Routes = [
  {
    path: '',
    component: SellerComponent,
    children: [
      {
        path: '',
        component: SellerPageComponent,
      },
      {
        path: 'portal/product/new',
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
