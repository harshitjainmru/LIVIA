import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  contact_email: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {contact_email:'vinayakhoaspital@yopmail.com',action:'Delete'}
  
  
];
@Component({
  selector: 'app-page-management',
  templateUrl: './page-management.component.html',
  styleUrls: ['./page-management.component.scss']
})
export class PageManagementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['contact_email', 'action'];
  dataSource = ELEMENT_DATA;
}
