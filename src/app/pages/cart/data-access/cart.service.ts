import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { io } from 'socket.io-client';
import { IResponse } from 'src/app/shared/model/interface';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  message$: BehaviorSubject<string> = new BehaviorSubject('');
  socket = io('http://localhost:8080');

  sendMessage(message: any) {
    console.log('sendMessage: ', message);
    this.socket.emit('message', message);
  }

  getNewMessage = () => {
    this.socket.on('message', (message) => {
      this.message$.next(message);
    });
    return this.message$.asObservable();
  };

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

  createCartItem(rawCartData: any): Observable<IResponse> {
    return this.http.post<any>(
      `${environment.backendUrl}/cart-item/create`,
      rawCartData
    );
  }

  constructor(private http: HttpClient) {}
}
