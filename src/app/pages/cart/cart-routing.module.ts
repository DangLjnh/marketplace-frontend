import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './feature/cart-page/cart-page.component';
import { LayoutSharedComponent } from 'src/app/shared/UI/layout/layout-shared/layout-shared.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutSharedComponent,
    children: [{ path: '', component: CartPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
