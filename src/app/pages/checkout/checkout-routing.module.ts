import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutPageComponent } from './feature/checkout-page/checkout-page.component';
import { LayoutSharedComponent } from 'src/app/shared/UI/layout/layout-shared/layout-shared.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutSharedComponent,
    children: [{ path: '', component: CheckoutPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
