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
  private _listCheckCartItem = new BehaviorSubject<any>([]);
  cartItem!: ICartItem;

  set listCheckCart(values: any[]) {
    this._listCheckCart.next(values);
  }
  set listCheckCartItem(values: any[]) {
    this._listCheckCartItem.next(values);
  }
  // set cartItem(values: ICartItem) {
  //   this._cartItem.next(values);
  // }
  get listCheckCart$(): Observable<any[]> {
    return this._listCheckCart.asObservable();
  }
  get listCheckCartItem$(): Observable<any[]> {
    return this._listCheckCart.asObservable();
  }
  // get cartItem$(): Observable<any> {
  //   return this._cartItem.asObservable();
  // }
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

// import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// import { CartService } from '../../data-access/cart.service';
// import { ICartItem, IProduct } from 'src/app/shared/model/interface';
// import { MatCheckboxChange } from '@angular/material/checkbox';

// @Component({
//   selector: 'app-cart-seller',
//   templateUrl: './cart-seller.component.html',
//   styleUrls: ['./cart-seller.component.scss'],
// })
// export class CartSellerComponent implements OnInit {
//   @Input() cartItems!: any[];
//   @Input() listCheckCartItem: any = [];
//   @Input() listCheckCart: any = [];
//   @Output() checkedPlus = new EventEmitter<number>();
//   @Output() checkedMinus = new EventEmitter<number>();
//   @Output() handleClickCounter = new EventEmitter<IProduct>();
//   @Output() handleInputChange = new EventEmitter<Event>();

//   toggleProductOptionCheck(event: MatCheckboxChange, cart: any): void {
//     cart.checked = event.checked;
//     this.cartService.cartItem = cart;
//     // this.cartService.listCheckCart = this.cartItems;
//     const aaa = JSON.stringify(this.cartItems);
//     if (this.listCheckCart.length == 0) {
//       let arr = [];
//       arr.push(cart);
//       this.listCheckCart.push(arr);
//     } else {
//       this.listCheckCart.forEach((listCheckCartItem: any, index: number) => {
//         const checkShopAlreadyExist = listCheckCartItem?.some(
//           (item: ICartItem) => item.Shop.id === cart.Shop.id
//         );
//         if (checkShopAlreadyExist) {
//           const alreadyAddToCard = listCheckCartItem.some(
//             (item: ICartItem) => item.id === cart.id
//           );
//           if (alreadyAddToCard) {
//             listCheckCartItem[index] = cart;
//           } else {
//             listCheckCartItem.push(cart);
//           }
//         } else {
//           let a = true;
//           this.listCheckCart.forEach(
//             (listCheck: ICartItem[], index: number) => {
//               listCheck.forEach((item) => {
//                 if (item.Shop.id === cart.Shop.id) {
//                   if (a === true) {
//                     a = false;
//                     this.listCheckCart.splice(index, 1);
//                   }
//                 }
//               });
//             }
//           );
//           let arr = [];
//           arr.push(cart);
//           const alreadyAddToCard = listCheckCartItem.some(
//             (item: ICartItem) => item.id === cart.id
//           );
//           if (alreadyAddToCard) {
//           }
//           this.listCheckCart.push(this.cartItems);
//         }
//       });
//     }
//     console.log(
//       '🚀 ~ file: cart-seller.component.ts:56 ~ CartSellerComponent ~ this.listCheckCart.forEach ~ this.listCheckCart:',
//       this.listCheckCart
//     );
//     this.cartService.listCheckCart = this.listCheckCart;
//   }

//   handleCheckAllShop() {
//     const areAllChecked = this.cartItems.every(
//       (product: any) => product.checked
//     );
//     this.cartItems.forEach(
//       (product: any) => (product.checked = !areAllChecked)
//     );
//     this.cartService.listCheckCart = this.cartItems;
//   }

//   constructor(private cartService: CartService) {}
//   ngOnInit(): void {
//     this.cartItems.forEach((product: any) => (product.checked = false));
//   }
// }
