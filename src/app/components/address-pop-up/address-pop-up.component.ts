import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../../account/verification/add-lab-detail/add-lab-detail.component';

@Component({
  selector: 'app-address-pop-up',
  templateUrl: './address-pop-up.component.html',
  styleUrls: ['./address-pop-up.component.scss']
})
export class AddressPopUpComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddressPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}



  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }




}

