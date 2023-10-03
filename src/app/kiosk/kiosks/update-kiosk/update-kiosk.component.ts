import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { KioskInfoRequest } from 'app/model/kioskInfoRequest';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-update-kiosk',
  templateUrl: './update-kiosk.component.html',
  styleUrls: ['./update-kiosk.component.scss'],
  providers: [NGXToastrService]
})
export class UpdateKioskComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*' ,
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  } 
  kiosk = new KioskInfoRequest();
  kiosks:KioskInfoRequest[];

  constructor(private http: HttpClient, private service: NGXToastrService,private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.kiosk = JSON.parse(localStorage.getItem('editKiosk'));
  }

  getKioskList() {
    return this.http.get<KioskInfoRequest[]>(environment.smartSafeAPIUrl + '/kiosk/all');
  }
  getAllKioskList() {
    return this.getKioskList().
      subscribe((data) => {
        console.log(data);
        this.kiosks = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  updateKiosk(id:number) {
    
    this.http.put<KioskInfoRequest>(environment.smartSafeAPIUrl + "/kiosk/"+id, this.kiosk, this.httpOptions).subscribe(
      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        this.service.updateSuccess();
        this.getAllKioskList();

      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        this.service.typeWarning();
      });

  
  console.log(JSON.stringify(this.kiosk));
}
}