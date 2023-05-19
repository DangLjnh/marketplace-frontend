import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  readCartDefault(userID: number): Observable<any> {
    return this.http.get<any>(
      `${environment.backendUrl}/cart/read-single-default/${userID}`
    );
  }
  constructor(private http: HttpClient) {}
}
