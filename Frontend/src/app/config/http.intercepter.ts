import { Inject, Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { switchMap } from "rxjs/internal/operators";

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // clone request and replace 'http://' with 'https://' at the same time
    const secureReq = req.clone({
      url: req.url.replace("http://", "https://")
    });
    // send the cloned, "secure" request to the next handler.
    return next.handle(secureReq);
  }
}
