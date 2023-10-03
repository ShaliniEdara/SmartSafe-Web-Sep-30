
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';
import { LocksInfoRequest } from 'app/model/locksInfoRequest';
import { StoreInfoRequest } from 'app/model/storeInfoRequest';


import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-locks',
  templateUrl: './locks.component.html',
  styleUrls: ['./locks.component.scss'],
  providers: [NGXToastrService]
})
export class LocksComponent implements OnInit {

  @ViewChild("addClassForm", null) addClassForm: NgForm;


  storeInfoRequest = new StoreInfoRequest();
  storeInfoRequests: StoreInfoRequest[];
 
  displayStyle = "none";
  dynamicText:string;
  popupid:string = "raise_request";
  openPopup() {
    this.displayStyle = "block";
  }

  getStoreList() {
    return this.http.get<StoreInfoRequest[]>(environment.smartSafeAPIUrl + '/storeinfo/all');
  }
  getAllStoresList() {
    return this.getStoreList().
      subscribe((data) => {
        console.log(data);
        this.storeInfoRequests = data;
        this.changeDetectorRefs.markForCheck();
      });
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  }


  lock = new LocksInfoRequest();
  locks : LocksInfoRequest[];



  constructor(private http: HttpClient,
    private router: Router,
    private service: NGXToastrService,
    private changeDetectorRefs: ChangeDetectorRef) {
  }

  getLockList(){
    return this.http.get<LocksInfoRequest[]>(environment.smartSafeAPIUrl + '/locks/all');

  }
  getAllLocksList() {
    return this.getLockList().
      subscribe((data) => {
        console.log(data);
        this.locks = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  addLock() {

    this.http.post<LocksInfoRequest>(environment.smartSafeAPIUrl + '/locks/', this.lock).subscribe(

      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        this.service.addSuccess();
        this.getAllLocksList();
        this.addClassForm.reset();
        this.dynamicText = "Lock Created Succesfully.";
        this.openPopup();
        this.popupid = "raise_request";

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
    console.log(JSON.stringify(this.lock));
    this.getAllLocksList();
  }

  editAddLocks(lock: LocksInfoRequest ) {

    localStorage.setItem('editLock', JSON.stringify(lock));
   
   this.router.navigate(["/kiosk/update-lock"]);

 }



locksdelete(lock: LocksInfoRequest) {
  console.log('coming into delete')

  if(lock.active){
    console.log('coming inside active true')
    Swal.fire({
      title: 'You cannot delete a active Lock ',
      text: "",
      type: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
     
    })
  }
  if(!(lock.active)){
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
      this.http.delete<LocksInfoRequest>(environment.smartSafeAPIUrl + "/locks/" + lock.id, this.httpOptions).subscribe(
        res => {
          console.log(res);
          //event.confirm.resolve(event.newData);
          this.service.typeDelete();
          this.getAllLocksList();

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
    this.getAllLocksList();
    this.getAllStoresList();
    console.log(this.getAllStoresList())

  }


displayStyle1 = "none";
  dynamicText2:string;

  openPopup1() {
    this.displayStyle1 = "block";
  }

  onSaveConfirm1() {

        this.dynamicText2 = "Hey.... Now, You need to Assign all Kiosk Information to AssignStore...";
        this.openPopup1();
        this.popupid = "raise_request";
        
  }

  closePopup() {
    
    this.displayStyle= "none";
    this.onSaveConfirm1();
   
  }
    
  closePopup1() {
    this.displayStyle1 = "none";
    if(this.dynamicText2=="Hey.... Now, You need to Assign all Kiosk Information to AssignStore..."){
      this.router.navigateByUrl('/assign/assignstore');
    }
  }

}
