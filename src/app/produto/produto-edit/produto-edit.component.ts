import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProdutoService} from "../produto.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-produto-edit',
  templateUrl: './produto-edit.component.html',
  styleUrls: ['./produto-edit.component.css']
})
export class ProdutoEditComponent implements OnInit {

  id: number | null = null;
  form = new FormGroup({
    nome: new FormControl(''),
    url: new FormControl(''),
    preco: new FormControl(''),
    descricao: new FormControl(''),
    categoria: new FormControl('')
  });
  categorias: string[] = [];

  constructor(private route: ActivatedRoute, private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.produtoService.getCategorias().subscribe(c => this.categorias = c);
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.produtoService.getById(params['id']).subscribe(p => {
          if (p) this.form.setValue(p);
        });
      } else {
        this.id = null;
        this.form.reset();
      }
    });
  }

  submit() {
    if (this.form.valid) {

    }
  }
}
