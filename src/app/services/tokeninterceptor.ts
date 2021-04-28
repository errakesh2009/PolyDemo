import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const API_KEY = '';
    httpRequest = httpRequest.clone({
        setHeaders: {
          Authorization: `Bearer ${API_KEY}`
        }
      });
      return next.handle(httpRequest);
  }
}