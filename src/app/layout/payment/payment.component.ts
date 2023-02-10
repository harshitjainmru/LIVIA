import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { MY_FORMATS } from "src/app/Constants/apiEndPoint";
import {
  NAV_TO_INITIATE_PAYMENT,
  NAV_TO_LAB_REQUEST,
  NAV_TO_LOGIN,
} from "src/app/Constants/commonRouters";
import { payment } from "src/app/Constants/statusDropdown";
import { PaymentService } from "src/app/services/dashboard Service/paymentService/payment.service";
import { UtcDateFormatService } from "src/app/services/utc-date-format.service";
export interface PaymentData {
  test_name: string;
  parent_id: string;
  claim_id: string;
  claim_date: string;
  default_full_amount: string;
  transaction_amount: string;
  transaction_status: string;
}

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    {
      provide: DateAdapter,
      useClass: UtcDateFormatService,
      deps: [MAT_DATE_LOCALE],
    },
  ],
})
export class PaymentComponent implements OnInit, OnDestroy {
  startDate = new FormControl();
  endDate = new FormControl();
  stDate: any;
  enDate: any;
  spinner = false;
  limitValue = 2;
  currPageIdx = 0;
  status_data: any;
  paymentBtn: any = [];
  filter = new FormControl();
  queryObj: any = {
    offset: 0,
    limit: 10,
  };
  selection = new SelectionModel<PaymentData>(true, []);
  disable_btn = false;
  sub: Subscription = new Subscription();
  payment_status=payment
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  constructor(private service: PaymentService, private _route: Router) {}
  
  ngOnInit(): void {
    this.checkboxChanged();
    this.applyFilter();
    this.getPaymentData();
  }
  ELEMENT_DATA!: PaymentData[];
  displayedColumns: string[] = [
    "parent_id",
    "claim_id",
    "test_name",
    "default_full_amount",
    "transaction_amount",
    "transaction_status",
    "claim_date",
  ];
  dataSource = new MatTableDataSource<PaymentData>(this.ELEMENT_DATA);
  
  checkboxChanged() {
    this.selection.changed.subscribe((data) => {
      if (data.added.length) {
        this.paymentBtn.push(data.added[0]);
      } else if (data.removed.length) {
        this.paymentBtn.map((payData: any, index: number) => {
          if (payData.claim_id == data.removed[0].claim_id) {
            this.paymentBtn.splice(index, 1);
          }
        });
      }
    });
  }
  getPaymentData() {
    this.spinner = true;
    if (!this.stDate) {
      delete this.queryObj["claim_start_date"];
      delete this.queryObj["claim_end_date"];
    }
    if (!this.filter.value) {
      delete this.queryObj["search"];
    }
    this.queryObj.offset = 0;
    this.sub.add(
      this.service.getPaymentList(this.queryObj).subscribe((res) => {
        this.ELEMENT_DATA = res.body;
        console.log(this.ELEMENT_DATA, "ekekiehfiwefgrygwg");
        this.ELEMENT_DATA.length = res.count;
        this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
        console.log(res, "welcome Payment");
        this.dataSource.paginator = this.paginator;
        this.spinner = false;
      })
    );
  }
  applyFilter() {
    this.sub.add(
      this.filter.valueChanges
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
        })
        );
      }
      statusFilter(event: any) {
        if (event) {
          this.queryObj["status"] = event;
        } else {
          delete this.queryObj["status"];
        }
        this.getPaymentData();
      }
      dropInsuFilter(event: any) {
    console.log(event, "dropdown values");
    if (event) {
      this.queryObj["insurance_company_id"] = event;
    } else {
      delete this.queryObj["insurance_company_id"];
    }
    this.getPaymentData();
  }
  
  claimStartDate(e: any) {
    const stringified = JSON.stringify(e.value);
    this.stDate = stringified.substring(1, 11);
    
    this.dateFilter();
    
  }
  claimEndDate(e: any) {
    let stringified = JSON.stringify(e.value);
    this.enDate = stringified.substring(1, 11);
    if (this.enDate && this.stDate) {
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
  navigateToInitiate() {
    this.service.setId(this.paymentBtn);
    localStorage.setItem("array_claim_id", this.paymentBtn);
    this._route.navigate([NAV_TO_INITIATE_PAYMENT]);
  }

  getNextData(currentSize: any, pageIdx: any, pageSize: any) {
    this.spinner = true;
    this.queryObj.offset = pageIdx;
    this.queryObj.limit = pageSize;
    this.sub.add(
      this.service.getPaymentList(this.queryObj).subscribe(
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
          this._route.navigate([NAV_TO_LOGIN]);
          this.spinner = false;
          console.log(err, "err from Lab Request");
        }
      )
    );
  }
  getPageData(event: any) {
    if (event.previousPageIndex < event.pageIndex) {
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
  }
  navigateToHome() {
    this._route.navigate([NAV_TO_LAB_REQUEST]);
  }
  // navigateToInitiate(data:any){
  //       localStorage.setItem('select_claimID',JSON.stringify(this.paymentBtn.claim_id))
  //         this._route.navigate(['review-claim'])
  // }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
