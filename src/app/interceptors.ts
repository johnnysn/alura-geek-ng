import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../environments/environment";
import {AuthService} from "./auth/auth.service";
import {catchError} from "rxjs/operators";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const account = this.authService.getUser();
    const isLoggedIn = account?.token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${account.token}` }
      });
    }

    return next.handle(request);
  }
}

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('Client side error');
            errorMsg = `Error: ${error.error.message}`;
          } else {
            console.log(`Server side error. Error Code: ${error.status},  Message: ${error.message}`);
            errorMsg = ErrorCatchingInterceptor.getErrorMessage(error);
          }
          console.error(error);
          return throwError(errorMsg);
        })
      );
  }

  private static getErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400: // Bad request
        return this.getObjErrorMsg(error);
      case 401:
        return "O acesso não foi autorizado com as credenciais utilizadas.";
      default:
        return error.message;
    }
  }

  private static getObjErrorMsg(error: HttpErrorResponse) {
    if (!!error.error) {
      return error.error.message;
    }
    return error.message;
  }
}
