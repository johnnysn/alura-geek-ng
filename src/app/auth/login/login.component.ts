import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('');
  password = new FormControl('');

  form = new FormGroup({
    email: this.email,
    password: this.password
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value.email, this.form.value.password).subscribe((value) => {
        void this.router.navigate(['produto/home']);
      });
    } else {
      alert('O formulário não foi preenchido corretamente.');
    }
  }
}
