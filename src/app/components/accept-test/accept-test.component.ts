import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { LabRequestService } from 'src/app/services/dashboard Service/requestService/lab-request.service';
import { InsuranceDetailsComponent } from '../insurance-details/insurance-details.component';

export interface RequestData {
  select: any;
  doctor_note: string;
  lab_test_name: string;
  status:string;
  table:String
 
}
@Component({
  selector: 'app-accept-test',
  templateUrl: './accept-test.component.html',
  styleUrls: ['./accept-test.component.scss']
})
export class AcceptTestComponent implements OnInit {
  spinner =true
  table:any
  userBalance:any;
  balance=true
  style_show=false
  id:any
  disable_btn=true
  ELEMENT_DATA!: RequestData[]
  selection = new SelectionModel <RequestData> (true, []);
  displayedColumns: string[] = ['select', 'test_name', 'doctor_notes', 'status'];
  dataSource = new MatTableDataSource<RequestData>();
  
  constructor(
    private dialog:MatDialog,
    public dialogRef: MatDialogRef<AcceptTestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service:LabRequestService,
  ) { 
    this.ELEMENT_DATA = data.data.lab_requests;
    this.id=data.data.claim_id
    this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    this.table=data;
  }
  ngOnInit(): void {
    this.getBalanceData()
    this.selection.changed.subscribe(item => {
      this.disable_btn = this.selection.selected.length == 0;
    })
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  getBalanceData(){
    this.service.getUserBalance(this.id).subscribe(res=>{
      this.userBalance = res.user_current_balance
      this.balance=false
      if(!this.userBalance){
        this.style_show=true
      }
      console.log(res,'balance..................');     
    },(err:any)=>{
      
    })
  }
  openDialog(): void {
   this.onNoClick();
   const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = ' 600px';
    const dialogRef = this.dialog.open(InsuranceDetailsComponent, {
      data: this.table,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.table = result;
    });
  }
}