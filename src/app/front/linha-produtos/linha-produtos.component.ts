import {Component, OnInit} from '@angular/core';
import {Produto} from '../../produto/produto';
import {ProdutoService} from '../../produto/produto.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-linha-produtos',
  templateUrl: './linha-produtos.component.html',
  styleUrls: ['./linha-produtos.component.scss']
})
export class LinhaProdutosComponent implements OnInit {

  categorias: string[] = [];
  categoriasShown: string[] = [];
  produtos: { [categoria: string]: Produto[] } = {};
  key = '';

  constructor(private produtoService: ProdutoService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(paramMap => {
      this.key = paramMap.get('key') ?? '';
      this.produtoService.getCategorias().subscribe(cats => this.updateCategorias(cats));
    });
  }

  updateCategorias(categorias: string[]) {
    this.categorias = categorias;
    this.categoriasShown = [];
    this.produtos = {};
    this.categorias.forEach(c => {
      this.produtoService.getProdutos(c, this.key).subscribe(prods => {
        this.produtos[c] = prods;
        if (prods && prods.length > 0)
          this.categoriasShown.push(c);
      });
    });
  }

}
