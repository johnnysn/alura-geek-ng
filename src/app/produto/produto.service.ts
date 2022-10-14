import {Injectable} from '@angular/core';
import * as produtosData from './data.json';
import {Observable} from 'rxjs'
import {of} from 'rxjs'
import {Produto} from './produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  data: {categorias: string[], produtos: Produto[]} = produtosData;

  constructor() {
  }

  getById(id: number): Observable<Produto | null> {
    return of(this.data.produtos.find(p => p.id == id) || null);
  }

  getProdutos(categoria?: string, key?: string): Observable<Produto[]> {
    let result: Produto[] = this.data.produtos.slice();
    if (categoria)
      result = result.filter((p: Produto) => p.categoria == categoria);
    if (key)
      result = result.filter((p: Produto) => p.nome.toLowerCase().includes(key.trim().toLowerCase()));

    return of(result);
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

  save(id: number | null, value: Produto): Observable<Produto | null> {
    if (id == null) {
      value.id = Math.max(...this.data.produtos.map(p => p.id)) + 1;
      this.data.produtos.push(value);
      return of(value);
    } else {
      value.id = id;
      for (let i = 0; i < this.data.produtos.length; i++) {
        const prod = this.data.produtos[i];
        if (prod.id == id) {
          this.data.produtos[i] = value;
          return of(value);
        }
      }
    }
    return of(null);
  }
}
