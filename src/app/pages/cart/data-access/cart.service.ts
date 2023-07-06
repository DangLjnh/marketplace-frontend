import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ICartItem, IResponse } from 'src/app/shared/model/interface';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _listCheckCart = new BehaviorSubject<any>([]);
  private _totalPrice = new BehaviorSubject<number>(0);
  cartItem!: ICartItem;

  set listCheckCart(values: any[]) {
    this._listCheckCart.next(values);
  }
  set totalPrice(values: number) {
    this._totalPrice.next(values);
  }

  get listCheckCart$(): Observable<any[]> {
    return this._listCheckCart.asObservable();
  }
  get totalPrice$(): Observable<number> {
    return this._totalPrice.asObservable();
  }

  updateQuantityCartItem(rawDataCartItem: any): Observable<IResponse> {
    return this.http.put<any>(
      `${environment.backendUrl}/cart-item/update-quantity`,
      rawDataCartItem
    );
  }

  updateQuantityCartItemOption(rawDataCartItem: any): Observable<IResponse> {
    return this.http.put<any>(
      `${environment.backendUrl}/cart-item-option/update-quantity`,
      rawDataCartItem
    );
  }

  readCartDefault(userID: number): Observable<IResponse> {
    return this.http.get<any>(
      `${environment.backendUrl}/cart/read-single-default/${userID}`
    );
  }

  createCartItem(rawCartData: any): Observable<IResponse> {
    return this.http.post<any>(
      `${environment.backendUrl}/cart-item/create`,
      rawCartData
    );
  }

  // group cart
  createGroupCart(rawCartData: {
    cartID: number;
    userID: number;
    quantity: number;
    name: string | null | undefined;
    productID: number;
    productPriceOptionID: number | null;
    shopID: number;
  }): Observable<IResponse> {
    return this.http.post<any>(
      `${environment.backendUrl}/group-cart/create`,
      rawCartData
    );
  }

  readAllGroupCartOfUser(userID: number): Observable<IResponse> {
    return this.http.get<any>(
      `${environment.backendUrl}/group-cart/read-all-group-cart/${userID}`
    );
  }

  readAllItemOfGroupCart(cartID: number): Observable<IResponse> {
    return this.http.get<any>(
      `${environment.backendUrl}/group-cart/read-all-item-group-cart/${cartID}`
    );
  }

  addUserToGroupCart(rawCartData: {
    cartID: number;
    userID: number;
  }): Observable<IResponse> {
    return this.http.post<any>(
      `${environment.backendUrl}/group-cart/add-user-to-group-cart`,
      rawCartData
    );
  }

  addItemToGroupCart(rawCartData: {
    cartID: number;
    userID: number;
    quantity: number;
    productID: number;
    productPriceOptionID: number | null;
    shopID: number;
  }): Observable<IResponse> {
    return this.http.post<any>(
      `${environment.backendUrl}/group-cart/add-item-to-cart-existed`,
      rawCartData
    );
  }

  constructor(private http: HttpClient) {}
}
