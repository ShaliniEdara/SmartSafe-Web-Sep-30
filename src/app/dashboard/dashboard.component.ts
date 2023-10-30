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
import { Corp } from 'app/model/corp';
import { DashBoardResponce } from 'app/model/dashboard';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [NGXToastrService]

})
export class DashboardComponent implements OnInit {

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

  corp =new Corp();
  corps: Corp[];
  selectedCorp = new Corp();
  locations:number=this.selectedCorp.locations;
  corpName:String;
  
  dashboardinfo=new DashBoardResponce();
  allLocationsToday:number;
  allCorpsTodayInsertBillsAmount:number;


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
    this.router.navigate(["/dashboard/charts-reports"])
    return this.http.get<StoreInfoRequest[]>(environment.smartSafeAPIUrl + '/storenames'+'/0');

  }

  allstoreinfo(){
    this.router.navigate(["/dashboard/allstoreinfo"])

  }


  getCorpInfoList(){
    return this.http.get<Corp[]>(environment.smartSafeAPIUrl + '/corp/all/');
  
  }
  getAllCorpInfoList(){
    return this.getCorpInfoList().
      subscribe((data) => {
        console.log(data);
        this.corps = data;
        
        this.changeDetectorRefs.markForCheck();
        this.corpName=this.corp.corpName;
        localStorage.setItem("corpname",this.corp.corpName)
        console.log("addsag............"+this.corp.corpName);
      });
  }

  
  corpinfo(corpName){
    return this.http.get<Corp>(environment.smartSafeAPIUrl + '/corp/' + corpName).
    subscribe((data) => {
      this.selectedCorp = data;
      this.locations=this.selectedCorp.locations;
      console.log(this.selectedCorp.locations);
    console.log("--------cropes names are------"+corpName);
    localStorage.setItem('corpName', corpName);
    //this.router.navigate(["/dashboard/corpInfo"]);
    //return this.http.get<Crop[]>(environment.smartSafeAPIUrl + '/cropNames');
    
  })
  }
  
  // getCorpsByCorpName(corpName: string) {
  //   return this.http.get<Corp>(environment.smartSafeAPIUrl + '/corp/' + corpName);
  // }

  // onCorpSelected(corpName: string) {
  //   this. getCorpsByCorpName(corpName).
  //     subscribe((data) => {
  //       this.selectedCorp = data;

  //     })
  // }
  getdashboardInfo(){
    return this.http.get<any>(environment.smartSafeAPIUrl + '/corp/dashboardinfo' ).subscribe((data) => {
      this.dashboardinfo= data;
      this.allCorpsTodayInsertBillsAmount=this.dashboardinfo.allCorpsTodayInsertBillsAmount;
    })

  }

  corpInfo(corpName:any){
    console.log(corpName);
  localStorage.setItem("corpname",corpName);
  this.router.navigate(["/dashboard/corpInfo"]);

  }
  
      

  ngOnInit() {
    this.getAllAssignedStoresList();
    this.getAllCorpInfoList();
    this.getdashboardInfo();
    
   // this.spinner.show();
   // this.getAllEndPointsList();
  }

}
