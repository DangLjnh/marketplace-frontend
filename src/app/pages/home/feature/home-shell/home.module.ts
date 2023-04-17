import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomePageComponent } from '../home-page/home-page.component';
import { HomeBannerComponent } from '../home-banner/home-banner.component';
import { HomeSidebarComponent } from '../home-sidebar/home-sidebar.component';
import { HomeFlashSaleComponent } from '../home-flash-sale/home-flash-sale.component';
import { HomeAdsComponent } from '../home-ads/home-ads.component';
import { HomeDailyDiscoverComponent } from '../home-daily-discover/home-daily-discover.component';

@NgModule({
  declarations: [
    HomePageComponent,
    HomeBannerComponent,
    HomeSidebarComponent,
    HomeFlashSaleComponent,
    HomeAdsComponent,
    HomeDailyDiscoverComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
