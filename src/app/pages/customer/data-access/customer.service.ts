import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  IAddress,
  IResponse,
  IUpdateUser,
} from 'src/app/shared/model/interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private _listAddress = new BehaviorSubject<any>(null);

  set listAddress(value: any) {
    this._listAddress.next(value);
  }
  get listAddress$(): Observable<any> {
    return this._listAddress.asObservable();
  }

  updateUser(rawUserData: any): Observable<IResponse> {
    return this.http.put<IResponse>(
      `${environment.backendUrl}/user/update`,
      rawUserData
    );
  }

  // API of address page
  readAllCity(): Observable<any> {
    return this.http.get<any>(`${environment.addressUrl}/?depth=1`);
  }
  readDistrictOfCity(cityCode: number): Observable<any> {
    return this.http.get<any>(
      `${environment.addressUrl}/p/${cityCode}/?depth=3`
    );
  }
  createAddress(rawAddressData: IAddress): Observable<IResponse> {
    return this.http.post<IResponse>(
      `${environment.backendUrl}/user/address/create`,
      rawAddressData
    );
  }
  readAddressOfUser(userID: number): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/user/address/read-all/${userID}`
    );
  }
  readAddressItem(addressID: number): Observable<IResponse> {
    return this.http.get<IResponse>(
      `${environment.backendUrl}/user/address/read-single/${addressID}`
    );
  }
  updateAddress(rawAddressData: IAddress): Observable<IResponse> {
    return this.http.put<IResponse>(
      `${environment.backendUrl}/user/address/update`,
      rawAddressData
    );
  }
  deleteAddress(addressID: number | undefined): Observable<IResponse> {
    return this.http.delete<IResponse>(
      `${environment.backendUrl}/user/address/delete/${addressID}`
    );
  }
  updateDefaultAddress(addressID: number | undefined): Observable<IResponse> {
    return this.http.put<IResponse>(
      `${environment.backendUrl}/user/address/update-default`,
      {
        id: addressID,
      }
    );
  }

  constructor(private http: HttpClient) {}
}
