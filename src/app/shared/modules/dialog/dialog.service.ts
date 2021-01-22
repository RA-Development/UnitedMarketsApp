import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {DialogComponent} from './dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  dialogRef: MatDialogRef<DialogComponent>;

  public open(options): void {
    this.dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText
      }
    });
  }

  public action(): Observable<any> {
    return this.dialogRef.afterClosed()
      .pipe(
        take(1),
        map(result => {
            return result;
          }
        ));
  }
}
