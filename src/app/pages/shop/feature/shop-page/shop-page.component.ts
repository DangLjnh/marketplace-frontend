import { Observable, filter, of, pluck, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../data-access/shop.service';
import { ActivatedRoute } from '@angular/router';
import {
  ICategoryFilter,
  IResponse,
  IShop,
} from 'src/app/shared/model/interface';
import { timeSince } from 'src/app/shared/utils/function';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss'],
})
export class ShopPageComponent implements OnInit {
  shop$!: Observable<IShop | unknown>;
  listCategoryFilter$!: Observable<ICategoryFilter[]>;
  shop!: IShop;
  constructor(
    private shopService: ShopService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.shop$ = this.route.params.pipe(
      pluck('slug'),
      switchMap((slug) => this.shopService.readSingleShop(slug)),
      switchMap((post) => {
        const shop = post.DT;
        return of(shop);
      }),
      filter((shop) => !!shop)
    );
    this.listCategoryFilter$ = this.route.params.pipe(
      pluck('slug'),
      switchMap((slug) => this.shopService.readAllCategoryFilterOfShop(slug)),
      switchMap((post) => {
        const shop = post.DT;
        return of(shop);
      }),
      filter((shop) => !!shop)
    );
    this.route.params
      .pipe(
        pluck('slug'),
        switchMap((slug) => this.shopService.readAllCategoryFilterOfShop(slug)),
        switchMap((post) => {
          const shop = post.DT;
          return of(shop);
        }),
        filter((shop) => !!shop)
      )
      .subscribe((data) => {
        console.log(
          '🚀 ~ file: shop-page.component.ts:54 ~ ShopPageComponent ~ ).subscribe ~ data:',
          data
        );
      });

    this.shop$.subscribe((data: any) => {
      this.shop = data;
      this.shop.createdAt = timeSince(new Date(data.createdAt));
    });
  }
}
