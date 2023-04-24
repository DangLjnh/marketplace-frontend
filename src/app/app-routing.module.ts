import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth-shell/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/feature/home-shell/home.module').then(
        (m) => m.HomeModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./pages/cart/feature/cart-shell/cart.module').then(
        (m) => m.CartModule
      ),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./pages/checkout/feature/checkout-shell/checkout.module').then(
        (m) => m.CheckoutModule
      ),
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./pages/category/feature/category-shell/category.module').then(
        (m) => m.CategoryModule
      ),
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./pages/customer/feature/customer-shell/customer.module').then(
        (m) => m.CustomerModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
