import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { FormControl } from "@angular/forms";
import { SettingsService } from "src/app/services/dashboard Service/commonService/dropdownService/settings.service";
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { LabRequestService } from "src/app/services/dashboard Service/requestService/lab-request.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AcceptTestComponent } from "src/app/components/accept-test/accept-test.component";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import { MY_FORMATS } from "src/app/Constants/apiEndPoint";
import { SnackBarServiceService } from "src/app/services/SnackBarCommonService/snack-bar-service.service";
import { UtcDateFormatService } from "src/app/services/utc-date-format.service";
import { NAV_TO_LOGIN } from "src/app/Constants/commonRouters";
import { of, Subscription } from "rxjs";

export interface RequestData {
  claim_id: string;
  doctor_name: string;
  insurance_company_name: string;
  beneficiary: string;
  total_lab_request: number;
  claim_date: string;
  action: String;
  table: string;
}

@Component({
  selector: "app-requets",
  templateUrl: "./requets.component.html",
  styleUrls: ["./requets.component.scss"],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    {
      provide: DateAdapter,
      useClass: UtcDateFormatService,
      deps: [MAT_DATE_LOCALE],
    },
  ],
})
export class RequetsComponent implements OnInit, OnDestroy {
  startDate = new FormControl();
  endDate = new FormControl();
  spinner = true;
  stDate: any;
  enDate: any;
  table: any;
  limitValue = 2;
  currPageIdx = 0;
  filter = new FormControl();
  queryObj: any = {
    offset: 0,
    limit: 10,
  };
  insurance_company: any;
  ELEMENT_DATA!: RequestData[];
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  sub: Subscription = new Subscription();

  constructor(
    private service: LabRequestService,
    private dropService: SettingsService,
    private route: Router,
    private snackServcie: SnackBarServiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getLabRequestData();
    this.applyFilter();
    this.getInsuranceData();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  displayedColumns: string[] = [
    "claim_id",
    "doctor_name",
    "beneficiary",
    "insurance_company_name",
    "total_lab_request",
    "claim_date",
    "Actions",
  ];
  dataSource = new MatTableDataSource<RequestData>(this.ELEMENT_DATA);

  openDialog(e: any): void {
    const data = new MatDialogConfig();
    data.minWidth = " 600px";
    data.autoFocus = true;

    data.data = {
      data: e,
    };
    const dialogRef = this.dialog.open(AcceptTestComponent, data);
    this.sub.add(dialogRef.afterClosed().subscribe((result) => {}));
  }

  getInsuranceData() {
    this.sub.add(
      this.dropService.getInsurance().subscribe((res: any) => {
        this.insurance_company =
          res.list_of_countries[1].list_of_insurance_company;
        console.log(
          res.list_of_countries[1].list_of_insurance_company,
          "jingalala hoo hoo jingalala hoo hoo"
        );
      })
    );
  }

  clearDate(event: any, id: number) {
    event.stopPropagation();
    if (id == 1) {
      this.stDate = null;
      delete this.queryObj["claim_start_date"];
      this.dateFilter();
    } else {
      delete this.queryObj["claim_end_date"];
      this.enDate = null;
      this.dateFilter();
    }
  }
  getLabRequestData() {
    this.spinner = true;
    if (!this.stDate) {
      delete this.queryObj["claim_start_date"];
      delete this.queryObj["claim_end_date"];
    }
    if (!this.filter.value) {
      delete this.queryObj["search"];
    }
    console.log(this.queryObj, "queruy");
    this.queryObj.offset = 0;

    this.sub.add(this.service.getLabRequest(this.queryObj).subscribe(
      (res) => {
        console.log(res, "Lab Request Response");
        this.ELEMENT_DATA = res.body;
        this.ELEMENT_DATA.length = res.count;
        this.spinner = false;
        this.dataSource.data = res.body as RequestData[];
      },
      (err) => {
        this.spinner = false;
        console.log(err, "err from Lab Request");
        localStorage.clear();
        this.route.navigate([NAV_TO_LOGIN]).then(() => {
          window.location.reload();
        });

        this.snackServcie.ErrorOpenSnackBar("Session Expired");
      }
    ));
  }

  applyFilter() {
    this.sub.add(this.filter.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged(),switchMap((res:any)=>{
        this.queryObj["search"] = res.replace(/\s/g, "");
        return this.service.getLabRequest(this.queryObj).pipe( (res:any)=>{
          return res;
        });
      }))
      .subscribe((res:any) => {
         console.log(res);
         this.ELEMENT_DATA.length = 0;
         this.ELEMENT_DATA.push(...res.body);
         this.ELEMENT_DATA.length = res.count;
         this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
         this.dataSource.paginator = this.paginator;
         this.spinner = false;
        // this.queryObj.offset = 0;
        // this.queryObjasdasdasdadasd.limit = 10;
        // if (this.filter.value) {
        //   if (isNaN(parseInt(this.filter.value))) {
        //     console.log("String search");
        //     this.queryObj["search"] = res.replace(/\s/g, "");
        //   } else {
        //     console.log("Number search", parseInt(res), typeof parseInt(res));
        //     this.queryObj["search"] = parseInt(res);
        //   }
        // } else {
        //   delete this.queryObj["search"];
        // }
        // this.paginator.pageIndex = 0;
        // this.getNextData(0, 0, 10);
      }));
  }
  dropInsuFilter(event: any) {
    console.log(event, "dropdown values");
    if (event) {
      this.queryObj["insurance_company_id"] = event;
      console.log(event, "harshit jain");
    } else {
      delete this.queryObj["insurance_company_id"];
    }
    this.getLabRequestData();
  }
  rejectAction(idx: any) {
    let id = this.dataSource.data[idx].claim_id;
    this.sub.add(this.service.rejectRequest(1).subscribe((res: any) => {
      if (res.code == 200) {
        this.getLabRequestData();
      }
    }));
  }
  claimStartDate(e: any) {
    const stringified = JSON.stringify(e.value);
    this.stDate = stringified.substring(1, 11);
      this.dateFilter();
  }
  claimEndDate(e: any) {
    let stringified = JSON.stringify(e.value);
    this.enDate = stringified.substring(1, 11);
    if(this.enDate && this.stDate){
    this.dateFilter();
    }
  }
  dateFilter() {
    this.spinner = true;
    if (this.stDate) {
      this.queryObj["claim_start_date"] = this.stDate;
    } else {
      delete this.queryObj["claim_start_date"];
    }
    if (this.enDate) {
      this.queryObj["claim_end_date"] = this.enDate;
    } else {
      delete this.queryObj["claim_end_date"];
    }
    this.paginator.pageIndex = 0;
    this.getNextData(0, 0, 10);
   
  }
  getNextData(currentSize: any, pageIdx: any, pageSize: any) {
    this.spinner = true;
    this.queryObj.offset = pageIdx;
    this.queryObj.limit = pageSize;
    console.log(this.queryObj, "queryobj");

   this.sub.add(this.service.getLabRequest(this.queryObj).subscribe(
      (res: any) => {
        this.ELEMENT_DATA.length = currentSize;
        this.ELEMENT_DATA.push(...res.body);
        this.ELEMENT_DATA.length = res.count;
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.spinner = false;
      },
      (err) => {
        localStorage.removeItem("tok");
        this.route.navigate([NAV_TO_LOGIN]);
        this.spinner = false;
        console.log(err, "err from Lab Request");
      }
    ));
  }
  getPageData(event: any) {
    this.spinner = true;
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
    let previousSize = pageSize * pageIndex;
    this.getNextData(
      previousSize,
      (pageIndex * 10).toString(),
      pageSize.toString()
    );
  }
  ngOnDestroy(): void {
    
    this.sub.unsubscribe();
  }
}
