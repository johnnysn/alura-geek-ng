import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProdutoService} from "../produto.service";
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";

@Component({
  selector: 'app-produto-edit',
  templateUrl: './produto-edit.component.html',
  styleUrls: ['./produto-edit.component.css']
})
export class ProdutoEditComponent implements OnInit {

  id: number | null = null;
  form = new UntypedFormGroup({
    nome: new UntypedFormControl(''),
    url: new UntypedFormControl(''),
    preco: new UntypedFormControl(''),
    descricao: new UntypedFormControl(''),
    categoria: new UntypedFormControl('')
  });
  categorias: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.produtoService.getCategorias().subscribe(c => this.categorias = c);
    this.route.params.subscribe(params => {
      this.form.reset();
      if (params['id']) {
        this.id = params['id'];
        this.produtoService.getById(params['id']).subscribe(p => {
          if (p) this.form.patchValue(p);
        });
      } else {
        this.id = null;
      }
    });
  }

  submit() {
    if (this.form.valid) {
      this.produtoService.save(this.id, this.form.value).subscribe(p => {
        void this.router.navigate(['produto/home']);
      });
    }
  }
}