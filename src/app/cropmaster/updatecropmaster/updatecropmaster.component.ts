import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Crop } from 'app/model/crop';
import { PrinterInfoRequest } from 'app/model/printerInfoRequest';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-updatecropmaster',
  templateUrl: './updatecropmaster.component.html',
  styleUrls: ['./updatecropmaster.component.scss'],
  providers: [NGXToastrService]
})
export class UpdatecropmasterComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*' ,
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  } 
  crop = new Crop();
  crops:Crop[];

  constructor(private http: HttpClient, private service: NGXToastrService,private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.crop = JSON.parse(localStorage.getItem('editCrop'));
  }
  getCropList() {
    return this.http.get<Crop[]>(environment.smartSafeAPIUrl + '/crop/all');
  }
  getAllCropList() {
    return this.getCropList().
      subscribe((data) => {
        console.log(data);
        this.crops = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  updateCrop(id:number) {
    
    this.http.put<Crop>(environment.smartSafeAPIUrl + "/crop/"+id, this.crop, this.httpOptions).subscribe(
      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        this.service.updateSuccess();
        this.getAllCropList();

      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        this.service.typeWarning();
      });

  
  console.log(JSON.stringify(this.crop));
}
}

