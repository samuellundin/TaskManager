import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {JWT_TOKEN} from "../service/authentication.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(localStorage.getItem(JWT_TOKEN)) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', localStorage.getItem(JWT_TOKEN))
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }

}
