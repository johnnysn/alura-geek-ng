import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProdutoService} from "../produto.service";
import {Produto} from "../produto";

@Component({
  selector: 'app-produto-details',
  templateUrl: './produto-details.component.html',
  styleUrls: ['./produto-details.component.css']
})
export class ProdutoDetailsComponent implements OnInit {

  produto: Produto | null = null;
  outros: Produto[] = [];

  constructor(private route: ActivatedRoute, private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.produtoService.getById(params['id']).subscribe(p => this.updateProduto(p))
    });
  }

  private updateProduto(p: Produto | null) {
    this.produto = p;
    if (p) {
      this.produtoService.getProdutos(p.categoria).subscribe( outros => {
        this.outros = outros.filter(o => o.id != p.id);
      });
    }
  }
}
