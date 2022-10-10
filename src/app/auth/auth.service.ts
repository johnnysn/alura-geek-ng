import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User | null = null;

  login(email: string, password: string): Observable<any> {
    this.user = {email: email, token: "dummy_token"};

    return of({});
  }

  logout() {
    this.user = null;
  }

  isAuthenticated() {
    return this.user != null;
  }

}
