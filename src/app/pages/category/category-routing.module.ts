import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryPageComponent } from './feature/category-page/category-page.component';
import { LayoutSharedComponent } from 'src/app/shared/UI/layout/layout-shared/layout-shared.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // category/:slug
  {
    path: '',
    component: LayoutSharedComponent,
    children: [{ path: ':slug', component: CategoryPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
