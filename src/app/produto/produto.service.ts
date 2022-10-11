import {Injectable} from '@angular/core';
import * as produtosData from './data.json';
import {Observable} from 'rxjs'
import {of} from 'rxjs'
import {Produto} from './produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  data = produtosData;

  constructor() {
  }

  getById(id: number): Observable<Produto | null> {
    return of(this.data.produtos.find(p => p.id == id) || null);
  }

  getProdutos(categoria?: string): Observable<Produto[]> {
    if (categoria)
      return of(this.data.produtos.slice().filter((p: Produto) => p.categoria == categoria));

    return of(this.data.produtos.slice());
  }

  getCategorias(): Observable<string[]> {
    return of(this.data.categorias.slice());
  }

  delete(id: number): Observable<Produto | null> {
    for (let i = 0; this.data.produtos.length; i++) {
      const prod = this.data.produtos[i];
      if (prod.id == id) {
        this.data.produtos.splice(i,1);
        return of(prod);
      }
    }

    return of(null);
  }
}
