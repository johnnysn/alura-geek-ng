import { Component, OnInit } from '@angular/core';
import {Produto} from "../produto";
import {ActivatedRoute} from "@angular/router";
import {ProdutoService} from "../produto.service";

@Component({
  selector: 'app-produto-ver-tudo',
  templateUrl: './produto-ver-tudo.component.html',
  styleUrls: ['./produto-ver-tudo.component.css']
})
export class ProdutoVerTudoComponent implements OnInit {

  produtos: Produto[] = [];
  categoria = '';

  constructor(private route: ActivatedRoute, private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoria = params['categoria'];
      this.produtoService.getProdutos(this.categoria).subscribe(
        prods => this.produtos = prods
      )
    });
  }

}
