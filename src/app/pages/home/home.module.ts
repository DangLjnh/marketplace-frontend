import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeBannerComponent } from './feature/home-banner/home-banner.component';
import { HomeSidebarComponent } from './feature/home-sidebar/home-sidebar.component';
import { HomeFlashSaleComponent } from './feature/home-flash-sale/home-flash-sale.component';
import { HomeAdsComponent } from './feature/home-ads/home-ads.component';
import { HomeDailyDiscoverComponent } from './feature/home-daily-discover/home-daily-discover.component';
import { HomePageComponent } from './feature/home-page/home-page.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { IconModule } from 'src/app/shared/UI/icon/icon.module';

@NgModule({
  declarations: [
    HomePageComponent,
    HomeBannerComponent,
    HomeSidebarComponent,
    HomeFlashSaleComponent,
    HomeAdsComponent,
    HomeDailyDiscoverComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MatPaginatorModule,
    IconModule,
  ],
  exports: [HomeDailyDiscoverComponent],
})
export class HomeModule {}
