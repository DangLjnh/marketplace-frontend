import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchPageComponent } from './feature/search-page/search-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { IconModule } from 'src/app/shared/UI/icon/icon.module';
import { HomeModule } from '../home/home.module';

@NgModule({
  declarations: [SearchPageComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    MatPaginatorModule,
    IconModule,
    HomeModule,
  ],
})
export class SearchModule {}
