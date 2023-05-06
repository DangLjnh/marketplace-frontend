import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { IconModule } from 'src/app/shared/UI/icon/icon.module';
import { ShopPageComponent } from './feature/shop-page/shop-page.component';

@NgModule({
  declarations: [
    ShopPageComponent
  ],
  imports: [CommonModule, ShopRoutingModule, SharedModule, IconModule],
})
export class ShopModule {}
