import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutSharedComponent } from 'src/app/shared/UI/layout/layout-shared/layout-shared.component';
import { ShopPageComponent } from './feature/shop-page/shop-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutSharedComponent,
    children: [{ path: ':slug', component: ShopPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
