import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/shared/model/interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  readSingleShop(slug: string): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/shop/read-single/${slug}`
    );
  }
  readAllCategoryFilterOfShop(id: number): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/category-filter/shop/${id}}`
    );
  }
  readAllProductByCategoryFilterOfShop(rawData: {
    shopID: number;
    categoryFilterID: number;
  }): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/category-filter/shop?shopID=${rawData.shopID}&categoryFilterID=${rawData.categoryFilterID}`
    );
  }
  readAllShopByCategory(categoryID: number): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/shop/read-all-category?categoryID=${categoryID}`
    );
  }
  constructor(private http: HttpClient) {}
}
