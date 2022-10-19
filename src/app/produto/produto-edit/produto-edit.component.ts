import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProdutoService} from "../produto.service";
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {SnackbarService} from "../../shared/snackbar/snackbar.service";
import {Produto} from "../produto";

@Component({
  selector: 'app-produto-edit',
  templateUrl: './produto-edit.component.html',
  styleUrls: ['./produto-edit.component.css']
})
export class ProdutoEditComponent implements OnInit {

  id: number | null = null;
  form = new UntypedFormGroup({
    nome: new UntypedFormControl(''),
    preco: new UntypedFormControl(''),
    descricao: new UntypedFormControl(''),
    categoria: new UntypedFormControl('')
  });
  categorias: string[] = [];
  produto: Produto | null = null;
  imgSrc = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.produtoService.getCategorias().subscribe(c => this.categorias = c);
    this.route.params.subscribe(params => {
      this.form.reset();
      if (params['id']) {
        this.id = params['id'];
        this.produtoService.getById(params['id']).subscribe(p => {
          if (p) this.form.patchValue(p);
          this.produto = p;
          this.imgSrc = p?.imgSrc ?? '';
        });
      } else {
        this.id = null;
        this.produto = null;
        this.imgSrc = '';
      }
    });
  }

  submit() {
    if (this.form.valid) {
      const data = {
        ...this.form.value,
        imgSrc: this.imgSrc
      }
      this.produtoService.save(this.id, data).subscribe(p => {
        this.snackbarService.show('Produto cadastrado com sucesso!');
        void this.router.navigate(['produto/home']);
      }, error => {
        this.snackbarService.error(error);
      });
    } else {
      this.snackbarService.show('Favor, preencher o formulário corretamente.', 'danger');
    }
  }

  setImgSrc(imgSrc: any) {
    this.imgSrc = imgSrc;
  }
}
