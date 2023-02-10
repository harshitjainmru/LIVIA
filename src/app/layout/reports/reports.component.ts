import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { MY_FORMATS } from "src/app/Constants/apiEndPoint";
import { NAV_TO_LAB_REQUEST, NAV_TO_LOGIN, NAV_TO_REPORT_DETAIL } from "src/app/Constants/commonRouters";
import { Report } from "src/app/Constants/statusDropdown";
import { SettingsService } from "src/app/services/dashboard Service/commonService/dropdownService/settings.service";
import { LabReportsService } from "src/app/services/dashboard Service/reportsService/lab-reports.service";
import { UtcDateFormatService } from "src/app/services/utc-date-format.service";
export interface LabReportData {
  patient_name: string;
  test_name: string;
  claim_id: number;
  claim_date: string;
  status: number;
  insurance_company_name: string;
}

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateAdapter, useClass: UtcDateFormatService, deps: [MAT_DATE_LOCALE] },
  ]
})
export class ReportsComponent implements OnInit, OnDestroy {
  spinner = false;
  startDate = new FormControl();
  endDate = new FormControl();
  insurance_company: any;
  stDate: any;
  enDate: any;
  disable_btn:boolean=true
  limitValue = 2;
  currPageIdx = 0;
  filter = new FormControl();
  queryObj: any = {
    offset: 0,
    limit: 10,
  };
  id: any;
  status: any;
  total_count: any;
  sub:Subscription=new Subscription()
  Report_status=Report
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  constructor(
    private reportService: LabReportsService,
    private dropService: SettingsService,
    private route: Router,
  ) {
  }
  
  ngOnInit(): void {
    this.getLabReportData();
    this.applyFilter();
    this.getInsuranceData();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ELEMENT_DATA!: LabReportData[];
  displayedColumns: string[] = [
    "claim_id",
    "test_name",
    "patient_name",
    "insurance_company_name",
    "status",
    "claim_date",
  ];
  dataSource = new MatTableDataSource<LabReportData>(this.ELEMENT_DATA);

  getInsuranceData() {
    this.sub.add(this.dropService.getInsurance().subscribe((res: any) => {
      this.insurance_company =
        res.list_of_countries[1].list_of_insurance_company;
      console.log(
        res.list_of_countries[1].list_of_insurance_company,
        "jingalala hoo hoo jingalala hoo hoo"
      );
    }));
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

  getLabReportData() {
    this.spinner = true;
    if (!this.stDate) {
      delete this.queryObj["claim_start_date"];
      delete this.queryObj["claim_end_date"];
    }
    if (!this.filter.value) {
      delete this.queryObj["search"];
    }
    this.queryObj.offset = 0;
    this.sub.add(this.reportService.getLabReport(this.queryObj).subscribe(
      (res: any) => {
        console.log(res);

        this.ELEMENT_DATA = res.body;
        this.ELEMENT_DATA.length = res.count;
        this.spinner = false;
        this.dataSource.data = res.body as LabReportData[];
      },
      (err) => {
        this.spinner = false;
        console.log(err, "err from Lab Request");
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
            console.log("String search");
            this.queryObj["search"] = res.trim();
          } else {
            console.log("Number search", parseInt(res), typeof parseInt(res));
            this.queryObj["search"] = parseInt(res);
          }
        } else {
          delete this.queryObj["search"];
        }
        this.paginator.pageIndex = 0;
        this.getNextData(0, 0, 10);
      }));
  }
  statusFilter(event: any) {
    if (event) {
      this.queryObj["status"] = event;
    } else {
      delete this.queryObj["status"];
    }
    this.getLabReportData();
  }
  dropInsuFilter(event: any) {
    console.log(event, "dropdown values");
    if (event) {
      this.queryObj["insurance_company_id"] = event;
    } else {
      delete this.queryObj["insurance_company_id"];
    }
    this.getLabReportData();
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
   this.sub.add(this.reportService.getLabReport(this.queryObj).subscribe(
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

  naviagte(data: any) {
    localStorage.setItem("claim_id", data.claim_id);
    this.route.navigate([NAV_TO_REPORT_DETAIL]);
    console.log(data.claim_id);
  }
  navigateToHome(){
    this.route.navigate([NAV_TO_LAB_REQUEST])
  }
  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }
}
