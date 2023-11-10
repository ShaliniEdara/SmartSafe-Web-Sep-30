import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Corp } from 'app/model/corp';
import { environment } from 'environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-crop-info',
  templateUrl: './crop-info.component.html',
  styleUrls: ['./crop-info.component.scss']
})
export class CropInfoComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*' ,
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  } 

  constructor(private http: HttpClient,private router:Router,private spinner:NgxSpinnerService,private changeDetectorRefs: ChangeDetectorRef) {

  }
  corp=new Corp();
  corpInfo :any;
  corpinfos:any ;
  corps:Corp[];
  corpName:string;
  today:Boolean=true;
  corpAllLocationsAllSafeAmount:number = 0;
  storeInfo:any[];
  //totalcorp:number = 0;
  
  
  corpinfo(storeName:string){
    localStorage.setItem("storeName",storeName);
    this.router.navigate(["/dashboard/charts-reports"])
  }

  onSearch(){
    
  }

   getCorpInfo(){
    console.log("--------we are in getCorpInfo methode")
    this.corpName=localStorage.getItem("corpname");
    //return this.http.get<any>(environment.smartSafeAPIUrl  + '/corp/' + this.corpName+'/'+this.today).subscribe((data) =>{
      return this.http.get<Corp>(environment.smartSafeAPIUrl+"/corp/"+this.corpName+"/"+1).
      subscribe((data) => {
        this.corpinfos = data;
        console.log("corp all info is -----" + this.corpinfos);
        this.storeInfo=this.corpinfos.storeInfoResponse;
      
      this.storeInfo.forEach(c =>
        this.corpAllLocationsAllSafeAmount += c.storeSafeAmount
        
        )
        console.log("corp alllocations all safeAmount------"+this.corpAllLocationsAllSafeAmount)

      });
      

  
  }

  
  

  ngOnInit() {
    
    this.getCorpInfo();
    
    

  }

}
