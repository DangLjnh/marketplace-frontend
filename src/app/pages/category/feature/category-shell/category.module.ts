import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryPageComponent } from '../category-page/category-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IconModule } from 'src/app/shared/UI/icon/icon.module';

@NgModule({
  declarations: [CategoryPageComponent],
  imports: [CommonModule, CategoryRoutingModule, SharedModule, IconModule],
})
export class CategoryModule {}
