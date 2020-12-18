import {ChangeDetectionStrategy, Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  styles: [`
    .header, .dialog-message {
      text-transform: lowercase;
    }
    .header::first-letter, .dialog-message::first-letter {
      text-transform: uppercase;
    }`]
})
export class DialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      cancelText: string,
      confirmText: string,
      message: string,
      title: string
    },
    private mdDialogRef: MatDialogRef<DialogComponent>){}

  ngOnInit(): void {
  }

  public cancel(): void {
    this.close(false);
  }
  public close(value): void  {
    this.mdDialogRef.close(value);
  }
  public confirm(): void  {
    this.close(true);
  }
  @HostListener('keydown.esc')
  public onEsc(): void  {
    this.close(false);
  }
}
