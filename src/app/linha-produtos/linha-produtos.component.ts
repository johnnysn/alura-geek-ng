import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto/produto';
import { ProdutoService } from '../produto/produto.service';

@Component({
  selector: 'app-linha-produtos',
  templateUrl: './linha-produtos.component.html',
  styleUrls: ['./linha-produtos.component.css']
})
export class LinhaProdutosComponent implements OnInit {

  categorias: string[] = [];
  produtos: { [categoria: string]: Produto[] } = {};

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.produtoService.getCategorias().subscribe(cats => this.updateCategorias(cats));
  }

  updateCategorias(categorias: string[]) {
    this.categorias = categorias;
    this.produtos = {};
    this.categorias.forEach(c => {
      this.produtoService.getProdutos(c).subscribe(prods => {
        this.produtos[c] = prods;
      });
    });
  }

}
