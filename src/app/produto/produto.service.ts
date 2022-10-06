import { Injectable } from '@angular/core';
import * as produtosData from './data.json';
import { Observable } from 'rxjs'
import { of } from 'rxjs'
import { Produto } from './produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  data = produtosData;

  constructor() { }

  getProdutos(categoria: string): Observable<Produto[]> {
    return of(this.data.produtos.slice().filter((p: Produto) => p.categoria == categoria));
  }

  getCategorias(): Observable<string[]> {
    return of(this.data.categorias.slice());
  }
}
