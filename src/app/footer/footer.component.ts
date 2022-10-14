import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {SnackbarService} from "../shared/snackbar/snackbar.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  form = new FormGroup({
    nome: new FormControl(''),
    mensagem: new FormControl('')
  });

  constructor(private snackbar: SnackbarService) {
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.valid) {
      this.snackbar.show('Agradecemos a sua mensagem!');
      this.form.reset();
    } else {
      this.snackbar.error('Favor, preencher os campos corretamente.');
    }
  }
}
