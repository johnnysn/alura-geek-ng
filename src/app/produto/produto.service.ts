import {Injectable} from '@angular/core';
import {Observable} from 'rxjs'
import {Produto} from './produto';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private client: HttpClient) {
  }

  getById(id: number): Observable<Produto | null> {
    return this.client.get<Produto | null>(environment.apiUrl + '/produtos/' + id);
  }

  getProdutos(categoria?: string, key?: string): Observable<Produto[]> {
    const search: any = {};
    if (categoria) search['categoria'] = categoria;
    if (key) search['key'] = key;

    return this.client.get<Produto[]>(environment.apiUrl + '/produtos', {params: search});
  }

  getCategorias(): Observable<string[]> {
    return this.client.get<string[]>(environment.apiUrl + '/categorias');
  }

  delete(id: number): Observable<any> {
    return this.client.delete(environment.apiUrl + '/produtos/' + id);
  }

  save(id: number | null, value: Produto): Observable<Produto> {
    if (id == null) {
      return this.client.post<Produto>(environment.apiUrl + '/produtos', value);
    } else {
      return this.client.put<Produto>(environment.apiUrl + '/produtos/' + id, value);
    }
  }
}
