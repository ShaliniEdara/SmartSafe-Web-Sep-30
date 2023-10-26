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
  corps:Corp[];
  corpName:string=localStorage.getItem("corpName");
  
  
  corpinfo(){
    this.router.navigate(["/dashboard/charts-reports"])
  }

  onSearch(){
    
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
      });
  }


  ngOnInit() {
    this.getAllCorpInfoList();
    

  }

}
