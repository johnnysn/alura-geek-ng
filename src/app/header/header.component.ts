import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchKey: string = '';
  searchShow = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    void this.router.navigate(['front']);
  }

  search() {
    if (this.searchKey) {
      void this.router.navigate(['/front'], {queryParams: {key: this.searchKey}});
    } else {
      void this.router.navigate(['/']);
    }
  }

  toggleShow() {
    this.searchShow = !this.searchShow;
  }
}
