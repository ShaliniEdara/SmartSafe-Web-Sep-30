import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Crop } from 'app/model/crop';
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
  crop=new Crop();
  crops:Crop[];
  cropName:string=localStorage.getItem("cropName");
  
  
  cropinfo(){
    this.router.navigate(["/dashboard/charts-reports"])
  }

  onSearch(){
    
  }

  getCropInfoList(){
    return this.http.get<Crop[]>(environment.smartSafeAPIUrl + '/crop/all/');
  
  }
  getAllCropInfoList(){
    return this.getCropInfoList().
      subscribe((data) => {
        console.log(data);
        this.crops = data;
        
        this.changeDetectorRefs.markForCheck();
      });
  }


  ngOnInit() {
    this.getAllCropInfoList();
    

  }

}
