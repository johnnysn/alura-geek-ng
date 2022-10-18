import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { DragAndDropFileDirective } from './drag-and-drop-file.directive';



@NgModule({
  declarations: [
    SnackbarComponent,
    UploadImageComponent,
    DragAndDropFileDirective
  ],
  imports: [
    CommonModule
  ],
    exports: [
        SnackbarComponent,
        UploadImageComponent
    ]
})
export class SharedModule { }
