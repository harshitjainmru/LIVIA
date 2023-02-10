import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarServiceService {

  constructor(private _snackBar:MatSnackBar) { }
  openSnackBar(message: string) {
    this._snackBar.open(message,'',{
      duration:3000,
      panelClass:'snackBar',
      horizontalPosition:'center',
      verticalPosition:'top'
    });
  }
  ErrorOpenSnackBar(message: string) {
    this._snackBar.open(message,'',{
      duration:3000,
      panelClass:'errSnackbar',
      horizontalPosition:'center',
      verticalPosition:'top'
    });
  }
}
