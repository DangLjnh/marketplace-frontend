import { Injectable, OnInit } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const access_token = localStorage.getItem('access_token');
    if (
      access_token &&
      !req.url.includes('https://provinces.open-api.vn/api/')
    ) {
      const headers = req.headers.set(
        'Authorization',
        `Bearer ${access_token}`
      );
      req = req.clone({ headers });
    }
    return next.handle(req);
  }
}
