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

  readAllProductOfShop(shopID: number | undefined): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/product/read-all/${shopID}`
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
  constructor(private http: HttpClient) {}
}
