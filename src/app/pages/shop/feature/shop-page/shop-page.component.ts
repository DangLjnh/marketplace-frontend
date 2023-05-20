import { Observable, filter, of, pluck, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../data-access/shop.service';
import { ActivatedRoute } from '@angular/router';
import { IShop } from 'src/app/shared/model/interface';
import { timeSince } from 'src/app/shared/utils/function';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss'],
})
export class ShopPageComponent implements OnInit {
  shop$!: Observable<IShop | unknown>;
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
    this.shop$.subscribe((data: any) => {
      this.shop = data;
      this.shop.createdAt = timeSince(new Date(data.createdAt));
    });
    // var str = '/var/www/site/Brand new document.docx';
    // console.log(str.replace(/\s/g, ''));
  }
}