import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct, IResponse } from 'src/app/shared/model/interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _listCheckProduct = new BehaviorSubject<any>([]);
  private _listCheckProductOption = new BehaviorSubject<any>([]);

  set listCheckProduct(values: IProduct[]) {
    this._listCheckProduct.next(values);
  }
  get listCheckProduct$(): Observable<IProduct[]> {
    return this._listCheckProduct.asObservable();
  }

  set listCheckProductOption(values: IProduct[]) {
    this._listCheckProductOption.next(values);
  }
  get listCheckProductOption$(): Observable<IProduct[]> {
    return this._listCheckProductOption.asObservable();
  }

  createProduct(rawProductData: any): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.backendUrl}/product/create`,
      rawProductData
    );
  }

  createProductTypeOption(rawProductData: any): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.backendUrl}/product-type-option/create`,
      rawProductData
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

  readAllProductWithStatusOfShop({
    shopID,
    statusID,
    offset,
    limit,
  }: {
    shopID: number;
    statusID: number;
    offset: number;
    limit: number;
  }) {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/product/read-all-status?shopID=${shopID}&statusID=${statusID}&offset=${offset}&limit=${limit}`
    );
  }

  readSingleProduct(productID: number): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/product/read-single/${productID}`
    );
  }

  updateProduct(rawProductData: any): Observable<IResponse> {
    return this.http.put<IResponse>(
      `${environment.backendUrl}/product/update`,
      rawProductData
    );
  }

  readQuantityProductStatus(rawProductData: any): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/product/read-count-status?shopID=${rawProductData.shopID}&statusID=${rawProductData.statusID}`
    );
  }

  updateStatusProduct(rawProductData: { productID: number; statusID: number }) {
    return this.http.post<IResponse>(
      `${environment.backendUrl}/product/update-status`,
      rawProductData
    );
  }
  constructor(private http: HttpClient) {}
}
