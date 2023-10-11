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
import { Crop } from 'app/model/crop';

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

  crop =new Crop();
  crops: Crop[];

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


  getCropInfoList(){
    return this.http.get<Crop[]>(environment.smartSafeAPIUrl + '/corp/all/');
  
  }
  getAllCropInfoList(){
    return this.getCropInfoList().
      subscribe((data) => {
        console.log(data);
        this.crops = data;
        
        this.changeDetectorRefs.markForCheck();
      });
  }

  cropinfo(cropNames){
    
    console.log("--------cropes names are------"+cropNames);
    localStorage.setItem('cropName', cropNames);
    this.router.navigate(["/dashboard/corpInfo"]);
    //return this.http.get<Crop[]>(environment.smartSafeAPIUrl + '/cropNames');
    

  }
  
    
  
  
      

  ngOnInit() {
    this.getAllAssignedStoresList();
    this.getAllCropInfoList();

   // this.spinner.show();
   // this.getAllEndPointsList();
  }

}
