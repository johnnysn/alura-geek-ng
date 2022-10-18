import { Component, OnInit } from '@angular/core';
import {SnackbarService} from "../snackbar/snackbar.service";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  file: File | null = null;
  imgSrc: any = '/assets/img/image-icon.png';
  dragMessage = 'Arraste para adicionar uma imagem para o produto';

  constructor(private snackbar: SnackbarService) { }

  ngOnInit(): void {
  }

  fileSearchHandler(event: any) {
    this.acceptFile(event.target.files[0]);
  }

  onFileDropped(file: File) {
    this.acceptFile(file);
  }

  acceptFile(file: File) {
    if (file.type != 'image/jpeg' && file.type != 'image/png') {
      this.snackbar.error('Somente arquivos jpeg e png são suportados.');
    }
    this.file = file;

    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imgSrc = e.target.result;
      this.dragMessage = 'Arraste para alterar a imagem do produto';
    };

    reader.readAsDataURL(file);
  }
}
