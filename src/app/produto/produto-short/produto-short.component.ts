import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Produto} from "../produto";

@Component({
  selector: 'app-produto-short',
  templateUrl: './produto-short.component.html',
  styleUrls: ['./produto-short.component.css']
})
export class ProdutoShortComponent implements OnInit {

  @Input() produtos: Produto[] = [];
  @Input() editMode = false;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  delete(id: number) {
    this.onDelete.emit(id);
  }

  edit(id: number) {
    this.onEdit.emit(id);
  }
}
