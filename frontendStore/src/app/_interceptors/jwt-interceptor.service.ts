import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import { UserService } from '../service/user.service';
const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end


@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  
    constructor(private userService: UserService
    ) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        // add authorization header with jwt token if available
       /* const currentUser = this.userService.currentUserValue;
        if (currentUser && currentUser.accessToken) {
            console.log("current user is :",currentUser.username);

            request = request.clone({
                setHeaders: {
                    Authorization: `${currentUser.type} ${currentUser.accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
        }
        return next.handle(request);
        */
       const currentUser = this.userService.currentUserValue;
       let token;
       if(currentUser!=null){
        token = currentUser.accessToken;
       }
        let authReq = request;
        if (token != null) {
          // for Spring Boot back-end
          authReq = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
            console.log('im the user and im already connected');
        }
        else 
            console.log('im not sure of being connected');

        return next.handle(authReq);
     
    }
}
export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ];