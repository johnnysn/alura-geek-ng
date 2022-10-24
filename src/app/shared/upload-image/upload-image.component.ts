import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SnackbarService} from "../snackbar/snackbar.service";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnChanges {

  file: File | null = null;
  imgSrc: any = 'assets/img/image-icon.png';
  dragMessage = 'Arraste para adicionar uma imagem para o produto';

  @Input() initialImgSrc = '';
  @Output() imgSrcChanged = new EventEmitter<any>();

  constructor(private snackbar: SnackbarService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initialImgSrc) {
      this.loadImage(this.initialImgSrc);
    } else {
      this.clearImage();
    }
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
      return;
    }
    this.file = file;

    const reader = new FileReader();

    reader.onload = (e: any) => {
      const imgSrc = e.target.result;
      this.loadImage(imgSrc);
      this.imgSrcChanged.emit(imgSrc);
    };

    reader.readAsDataURL(file);
  }

  private loadImage(src: any) {
    this.imgSrc = src;
    this.dragMessage = 'Arraste para alterar a imagem do produto';
  }

  private clearImage() {
    this.imgSrc = 'assets/img/image-icon.png';
    this.dragMessage = 'Arraste para adicionar uma imagem para o produto';
  }
}
