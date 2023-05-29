import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailPageComponent } from './feature/product-detail-page/product-detail-page.component';
import { LayoutSharedComponent } from 'src/app/shared/UI/layout/layout-shared/layout-shared.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutSharedComponent,
    children: [{ path: ':id', component: ProductDetailPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
