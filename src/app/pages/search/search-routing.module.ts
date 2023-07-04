import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutSharedComponent } from 'src/app/shared/UI/layout/layout-shared/layout-shared.component';
import { SearchPageComponent } from './feature/search-page/search-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // category/:slug
  {
    path: '',
    component: LayoutSharedComponent,
    children: [{ path: ':slug', component: SearchPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
