import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IResponse } from 'src/app/shared/model/interface';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  updateQuantityCartItem(rawDataCartItem: any): Observable<IResponse> {
    return this.http.put<any>(
      `${environment.backendUrl}/cart-item/update-quantity`,
      rawDataCartItem
    );
  }

  readCartDefault(userID: number): Observable<IResponse> {
    return this.http.get<any>(
      `${environment.backendUrl}/cart/read-single-default/${userID}`
    );
  }

  // readCartDefault(userID: number): Observable<any> {
  //   return new Observable((observer) => {
  //     const socket = io('http://localhost:8080');

  //     socket.on('connect', () => {
  //       socket.emit('userID', userID);
  //     });

  //     socket.on('cart_list_default', (dataCartListDefault) => {
  //       console.log('Received data_cart event:', dataCartListDefault);
  //       // Process the received data as needed
  //       observer.next(dataCartListDefault);
  //       observer.complete();
  //     });

  //     return () => {
  //       // Clean up any resources if needed
  //       socket.disconnect();
  //     };
  //   });
  // }

  // createCartItem(rawCartData: any) {
  //   // const socket = io('http://localhost:8080');
  //   // socket.emit('cart_item', rawCartData);
  //   // return this.http.post<any>(
  //   //   `${environment.backendUrl}/cart-item/create`,
  //   // );
  // }

  createCartItem(rawCartData: any) {
    return this.http.post<any>(
      `${environment.backendUrl}/cart-item/create`,
      rawCartData
    );
  }

  constructor(private http: HttpClient) {}
}
