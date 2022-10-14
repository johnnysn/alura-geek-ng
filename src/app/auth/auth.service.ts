import {Injectable} from "@angular/core";
import {Observable, of, throwError} from "rxjs";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User | null = null;

  login(email: string, password: string): Observable<User> {
    this.user = {email: email, token: "dummy_token"};

    if (email != 'meirelles@geek.com' || password != '123456')
      return throwError('Credenciais inválidas!');

    return of(this.user);
  }

  logout() {
    this.user = null;
  }

  isAuthenticated() {
    return this.user != null;
  }

}
