import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import {Produto} from "./produto/produto";
import {User} from "./auth/user";
import * as jsonData from './data.json';

// Frescura do typescript
let data = jsonData;

// @ts-ignore
let produtos: Produto[] = JSON.parse(localStorage.getItem('produtos')) || data['produtos'];
// @ts-ignore
let categorias: string[] = JSON.parse(localStorage.getItem('categorias')) || data['categorias'];
// @ts-ignore
let users: User[] = JSON.parse(localStorage.getItem('users')) || data['users'];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(100))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('/auth/login') && method === 'POST':
          return authenticate();
        case url.endsWith('/produtos') && method === 'GET':
          return getProdutos();
        case url.endsWith('/categorias') && method === 'GET':
          return getCategorias();
        case url.match(/\/produtos\/\d+$/) && method === 'GET':
          return getProdutoById(idFromUrl());
        case url.match('/produtos') && method === 'POST':
          return addProduto();
        case url.match(/\/produtos\/\d+$/) && method === 'PUT':
          return updateProduto();
        case url.match(/\/produtos\/\d+$/) && method === 'DELETE':
          return deleteProduto();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { email, password } = body;
      const user = users.find(x => x.email === email && x.password === password);
      if (!user) return error('Email ou senha incorretos');
      return ok({
        email: user.email,
        token: 'fake-jwt-token'
      })
    }

    function getProdutos() {
      const categoria = request.params.get('categoria');
      const key = request.params.get('key');
      let result: Produto[] = produtos.slice();
      if (categoria)
        result = result.filter((p: Produto) => p.categoria == categoria);
      if (key)
        result = result.filter((p: Produto) => p.nome.toLowerCase().includes(key.trim().toLowerCase()));
      return ok(result);
    }

    function getCategorias() {
      return ok(categorias.slice());
    }

    function getProdutoById(id: number) {
      return ok(produtos.find(p => p.id == id) || null);
    }

    function addProduto() {
      if (!isLoggedIn()) return unauthorized();

      const value = body;
      value.id = Math.max(...produtos.map(p => p.id)) + 1;

      produtos.push(value);
      localStorage.setItem('produtos', JSON.stringify(produtos));

      return ok(value);
    }

    function updateProduto() {
      if (!isLoggedIn()) return unauthorized();

      const params = body;
      const produto: Produto | null = produtos.find(x => x.id === idFromUrl()) ?? null;

      if (!produto) {
        return error('Produto não encontrado.');
      }

      Object.assign(produto, params);
      localStorage.setItem('produtos', JSON.stringify(produtos));

      return ok(produto);
    }

    function deleteProduto() {
      if (!isLoggedIn()) return unauthorized();

      produtos = produtos.filter(x => x.id !== idFromUrl());
      localStorage.setItem('produtos', JSON.stringify(produtos));
      return ok();
    }

    // helper functions

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function error(message: string) {
      return throwError({ status: 400, error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Acesso não autorizado.' } });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
