import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {
  }

  public showNotification(message): void {
    this.snackBar.open(message, 'success', {
        duration: 5000,
        politeness: 'polite',
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['mat-toolbar', 'mat-accent']
      }
    );
  }

}
