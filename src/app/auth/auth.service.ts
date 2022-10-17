import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "./user";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User | null = null;

  constructor(private client: HttpClient) {
  }

  login(email: string, password: string): Observable<User> {
    return this.client.post<User>(environment.apiUrl + '/auth/login', {email: email, password: password})
      .pipe(
        tap(user => {
          this.user = user;
        })
      );
  }

  logout() {
    this.user = null;
  }

  isAuthenticated() {
    return this.user != null;
  }

  getUser() {
    return this.user ? {email: this.user?.email, token: this.user?.token} : null;
  }
}
