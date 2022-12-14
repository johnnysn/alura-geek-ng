import { Component, OnInit } from '@angular/core';
import {ProdutoService} from "../produto.service";
import {Produto} from "../produto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-produto-home',
  templateUrl: './produto-home.component.html',
  styleUrls: ['./produto-home.component.css']
})
export class ProdutoHomeComponent implements OnInit {

  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService, private router: Router) { }

  ngOnInit(): void {
    this.updateProducts();
  }

  private updateProducts() {
    this.produtoService.getProdutos().subscribe(
      prods => this.produtos = prods
    );
  }

  delete(id: number) {
    this.produtoService.delete(id).subscribe(p => {
      this.updateProducts();
    });
  }

  add() {
    void this.router.navigate(['produto/edit']);
  }

  edit(id: number) {
    void this.router.navigate(['produto/edit/' + id]);
  }
}
