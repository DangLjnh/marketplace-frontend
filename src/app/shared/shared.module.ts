import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { IconDiscountComponent } from './UI/icon/icon-discount/icon-discount.component';
import { HeaderComponent } from '../layouts/header/header-home/header.component';
import { HeaderTooltipCartComponent } from '../layouts/header/header-tooltip-cart/header-tooltip-cart.component';
import { FooterComponent } from '../layouts/footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HeaderTooltipCartComponent,
    IconDiscountComponent,
  ],
  imports: [CommonModule, MatInputModule, MatIconModule, MatBadgeModule],
  exports: [HeaderComponent, IconDiscountComponent, FooterComponent],
})
export class SharedModule {}
