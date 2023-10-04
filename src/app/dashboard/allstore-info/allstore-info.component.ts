import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Application } from 'app/model/api';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Status } from 'app/model/status';
import { NgxSpinnerService } from 'ngx-spinner';
import { StoreInfoRequest } from 'app/model/storeInfoRequest';
import { NGXToastrService } from 'app/service/toastr.service';
import { ConsoleService } from '@ng-select/ng-select/ng-select/console.service';
import { Eod } from 'app/model/eod';


@Component({
  selector: 'app-allstore-info',
  templateUrl: './allstore-info.component.html',
  styleUrls: ['./allstore-info.component.scss']
})
export class AllstoreInfoComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*' ,
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  } 

  store = new StoreInfoRequest();
  
  stores: StoreInfoRequest[];
  selectedStore = new StoreInfoRequest();

  api=new Application();
  status=new Status();
  apis: Application[];
  constructor(private http: HttpClient,private router:Router,private spinner:NgxSpinnerService,private changeDetectorRefs: ChangeDetectorRef) {

   }
 
   getAssignedStoreList() {
    return this.http.get<StoreInfoRequest[]>(environment.smartSafeAPIUrl + '/storeinfo/all/assignedStores');
  }
  getAllAssignedStoresList() {
    return this.getAssignedStoreList().
      subscribe((data) => {
        console.log(data);
        this.stores = data;
        
        this.changeDetectorRefs.markForCheck();
      });
  }

  reports(storenames){
    console.log(storenames);
    localStorage.setItem('storename', storenames);
    localStorage.setItem('storename', storenames);
    this.router.navigate(["/dashboard/charts-reports"])
    return this.http.get<StoreInfoRequest[]>(environment.smartSafeAPIUrl + '/storenames'+'/0');

  }

  allstoreinfo(){
    this.router.navigate(["/dashboard/allstoreinfo"])

  }





  storeNames:string;
    title = 'dashboard';
  chart;
  chart2 = [];
  pie: any;
  doughnut: any;

  data1 = [];
    
  storename:string=localStorage.getItem("storename");
  //storeinfo=new StoreResponse();
  //storeinfermation:StoreResponse[];
//   storeInfo(){
//     console.log("we are in  charts-reports.ts storeInfo methode");
//  return this.http.get<StoreResponse[]>(environment.smartSafeAPIUrl + "/storeinfo/StoreInfoForDashBoard/"+this.storename,this.httpOptions).subscribe(data=>{
//       console.log(data);
//       this.storeinfermation=data;
//     });
// }
eod=new Eod();
eods:Eod[];
//reports:any;
//storename:string=localStorage.getItem("storename");
today:number=0;

// eodReports(){
//  console.log("we are in eod reports");
// return this.http.get<Eod[]>(environment.smartSafeAPIUrl + "/reports/EODReportChartsCopy/"+this.storename+"/"+this.today,this.httpOptions).subscribe(data=>{
//    console.log(data);
//    this.eods=data;
   
//    console.log("this is reports info",this.eods.map(row =>row.totalValue));
   
// });


//}
dashboard:any;
async dashBoardInfo(){
  console.log("we are in dashboard methode");
    return await this.http.get(environment.smartSafeAPIUrl+"/dashbordinfo/AllDashBoardInfo/"+this.storename+"/"+this.today,this.httpOptions).subscribe(data=>{
    console.log(data);
    this.dashboard=data;
    this.eods=this.dashboard["eodReport"];

    console.log("the total eob bill amount is "+this.dashboard.totalEodBillsAmount);
    
  })
}

  
    
  
  
      

  ngOnInit() {
    this.getAllAssignedStoresList();
    this.dashBoardInfo();

   // this.spinner.show();
   // this.getAllEndPointsList();
  }

}
