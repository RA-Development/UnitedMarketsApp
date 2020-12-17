import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DialogComponent} from './dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogService} from './dialog.service';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [
    DialogComponent
  ],
  exports: [DialogComponent],
  entryComponents: [DialogComponent],
  providers: [DialogService]
})
export class DialogModule {
}
