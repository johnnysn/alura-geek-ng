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
    this.produtos = {};
    this.categorias.forEach(c => {
      this.produtoService.getProdutos(c, this.key).subscribe(prods => {
        this.produtos[c] = prods;
      });
    });
    // TODO Remover categorias vazias
    let i = 0;
    while (i < this.categorias.length) {
      if (this.produtos[this.categorias[i]].length == 0) {
        this.categorias.splice(i, 1);
      } else {
        i++;
      }
    }
  }

}
