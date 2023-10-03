import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { KioskInfoRequest } from 'app/model/kioskInfoRequest';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kiosk',
  templateUrl: './kiosk.component.html',
  styleUrls: ['./kiosk.component.scss'],
  providers: [NGXToastrService]
})
export class KioskComponent implements OnInit {

  @ViewChild("addClassForm", null) addClassForm: NgForm;


  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  }

  kiosk = new KioskInfoRequest();
  kiosks : KioskInfoRequest[];
  ips : KioskInfoRequest[];


  constructor(private http: HttpClient,
    private router: Router,
    private service: NGXToastrService,
    private changeDetectorRefs: ChangeDetectorRef) {

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
AddKiosk() {
  this.http.post<KioskInfoRequest>(environment.smartSafeAPIUrl + '/kiosk/', this.kiosk).subscribe(
    res => {
      console.log(res);
      //event.confirm.resolve(event.newData);
      this.service.addSuccess();
      this.getAllKioskList();
      this.addClassForm.reset();

    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
      //this.service.typeWarning();
      this.service.typeCustommessage(err.error.message);
    });
  console.log(JSON.stringify(this.kiosk));
  this.getAllKioskList();
}

editAddKiosk(kiosk: KioskInfoRequest ) {

  localStorage.setItem('editKiosk', JSON.stringify(kiosk));
 
 this.router.navigate(["/kiosk/update-kiosk"]);

}

kioskdelete(kiosk: KioskInfoRequest) {
  console.log('coming into delete')

  if(kiosk.active){
    console.log('coming inside active true')
    Swal.fire({
      title: 'You cannot delete a active kiosk ',
      text: "",
      type: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
     
    })
  }
  if(!(kiosk.active)){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'

  }).then((result) => {
    console.log("hi");

    if (result.value) {
      console.log("hello");
      this.http.delete<KioskInfoRequest>(environment.smartSafeAPIUrl + "/kiosk/" + kiosk.id, this.httpOptions).subscribe(
        res => {
          console.log(res);
          //event.confirm.resolve(event.newData);
          this.service.typeDelete();
          this.getAllKioskList();
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        });
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })

}
}



  ngOnInit() {
    this.getAllKioskList();
    


  }

}
