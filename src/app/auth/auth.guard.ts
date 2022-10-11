import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {CanActivate, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(): boolean {
    return true;

    if (!this.authService.isAuthenticated()) {
      void this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
