import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from 'src/app/shared/model/interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readSingleProduct(productID: number): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/product/read-single/${productID}`
    );
  }

  readAllProduct(paginate: {
    offset: number;
    limit: number;
  }): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/product/read-all?offset=${paginate.offset}&limit=${paginate.limit}`
    );
  }

  searchSameProduct(name: any): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.backendCrawlUrl}/product/search`,
      name
    );
  }

  readAllProductOfShop({
    shopID,
    offset,
    limit,
  }: {
    shopID: number | undefined;
    offset: number;
    limit: number;
  }): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/product/read-all-shop?shopID=${shopID}&offset=${offset}&limit=${limit}`
    );
  }
  constructor(private http: HttpClient) {}
}
