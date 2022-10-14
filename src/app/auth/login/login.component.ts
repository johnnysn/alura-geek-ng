import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {SnackbarService} from "../../shared/snackbar/snackbar.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new UntypedFormControl('');
  password = new UntypedFormControl('');

  form = new UntypedFormGroup({
    email: this.email,
    password: this.password
  });

  constructor(private authService: AuthService, private router: Router, private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value.email, this.form.value.password).subscribe(
        (value) => {
          this.snackbarService.show('Login efetuado com sucesso!');
          void this.router.navigate(['produto/home']);
        },
        error => {
          this.snackbarService.show(error, 'danger');
        }
      );
    }
  }
}
