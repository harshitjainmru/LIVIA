import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { NAV_TO_LAB_REQUEST, NAV_TO_LOGIN } from "src/app/Constants/commonRouters";
import { LabTestService } from "src/app/services/dashboard Service/testService/lab-test.service";
export interface ImagingTest {
  name: string;
  test_fee: number;
  insurance_company_name: string;
}

@Component({
  selector: "app-tests",
  templateUrl: "./tests.component.html",
  styleUrls: ["./tests.component.scss"],
})
export class TestsComponent implements OnInit,OnDestroy {
  spinner = true;
  filter = new FormControl();
  limitValue = 2;
  currPageIdx = 0;
  queryObj: any = {
    offset: 0,
    limit: 10,
  };
  constructor(private service: LabTestService, private _route: Router) {}
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  sub:Subscription=new Subscription()
  ELEMENT_DATA!: ImagingTest[];
  displayedColumns: string[] = ["name", "test_fee", "insurance_company_name"];
  dataSource = new MatTableDataSource<ImagingTest>(this.ELEMENT_DATA);
  ngOnInit(): void {
    this.applyFilter();
    this.applyFilter()
    this.getLabTestData();
  }
  getLabTestData() {
    this.spinner = true;
   this.sub.add(this.service.getTestData(this.queryObj).subscribe(
      (res: any) => {
        this.ELEMENT_DATA=res.body;
        this.ELEMENT_DATA.length=res.count;
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA)
        console.log(res, "Welcome to the lab test hurray");
        this.dataSource.paginator = this.paginator;
        this.spinner = false;
      },
      (err) => {
        this._route.navigate([NAV_TO_LOGIN]).then(() => {
          window.location.reload();
        });
      }
    ));
  }
  applyFilter() {
    this.sub.add(this.filter.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((res) => {
        this.queryObj.offset = 0;
        this.queryObj.limit = 10;
        if (this.filter.value) {
          if (isNaN(parseInt(this.filter.value))) {
            this.queryObj["search"] = res.trim();
            console.log(this.queryObj["search"],'harshitJain');  
          } else {
            this.queryObj["search"] = parseInt(res);
            console.log(this.queryObj["search"],'harshitJain');
            console.log("hiiiiii", typeof parseInt(res));
          }
        } else {
          delete this.queryObj["search"];
        }
        this.paginator.pageIndex=0;
        this.getNextData(0,0,10)
      }));
  }
  getNextData(currentSize: any, pageIdx: any,pageSize:any) {
    this.spinner = true;
    this.queryObj.offset = pageIdx;
    this.queryObj.limit = pageSize;
    this.sub.add(this.service.getTestData(this.queryObj).subscribe(
      (res:any) => {
        this.ELEMENT_DATA.length = currentSize;
        this.ELEMENT_DATA.push(...res.body);
        this.ELEMENT_DATA.length = res.count;
        this.dataSource =new MatTableDataSource<any>(this.ELEMENT_DATA) ;
        this.dataSource.paginator = this.paginator;
        this.spinner = false;
      },
      (err) => {
        localStorage.removeItem('tok');
        this._route.navigate([NAV_TO_LOGIN])
        this.spinner = false;
        console.log(err, 'err from Lab Request');
      }
    ));
  }
  getPageData(event: any) {
    this.spinner = true;
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
    let previousSize = pageSize * pageIndex;
    this.getNextData(previousSize,((pageIndex)*10).toString(),pageSize.toString());
  }
  navigateToHome(){
    this._route.navigate([NAV_TO_LAB_REQUEST])
  }
  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }
}
