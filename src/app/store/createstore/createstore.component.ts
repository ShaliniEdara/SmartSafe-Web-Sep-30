import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Corp } from 'app/model/corp';
import { Role } from 'app/model/role';
import { StoreInfoRequest } from 'app/model/storeInfoRequest';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createstore',
  templateUrl: './createstore.component.html',
  styleUrls: ['./createstore.component.scss'],
  providers: [NGXToastrService]
})
export class CreatestoreComponent implements OnInit {
  @ViewChild("addClassForm", null) addClassForm: NgForm;


  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  }

  displayStyle = "none";
  dynamicText:string;
  popupid:string = "raise_request";
  openPopup() {
    this.displayStyle = "block";
}
  storeInfoRequest = new StoreInfoRequest();
  storeInfoRequests: StoreInfoRequest[];

  constructor(private http: HttpClient,
    private router: Router,
    private service: NGXToastrService,
    private changeDetectorRefs: ChangeDetectorRef) {
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
  addStore(id:any) {
  console.log("xyz.........",id) 
    this.http.post<StoreInfoRequest>(environment.smartSafeAPIUrl + '/storeinfo/'+id, this.storeInfoRequest).subscribe(
      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        this.service.addSuccess();
        this.getAllStoresList();
        this.addClassForm.reset();
        this.dynamicText = "Store Created Succesfully.";
        this.openPopup();
        this.popupid = "raise_request";
        
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        this.service.typeCustommessage(err.error.message);
      });
    console.log(JSON.stringify(this.storeInfoRequest));
    this.getAllStoresList();
  }

  editstoreInfoRequest(storeInfoRequest: StoreInfoRequest) {

    console.log(storeInfoRequest.id)
    localStorage.setItem("id",String(storeInfoRequest.id))

    console.log(storeInfoRequest)
    localStorage.setItem('editStore', JSON.stringify(storeInfoRequest));
    this.router.navigate(["/store/updatestore"]);

  }

storedelete(storeInfoRequest: StoreInfoRequest) {
  console.log('coming into delete')

    if(storeInfoRequest.status){
      console.log('coming inside active true')
      Swal.fire({
        title: 'You cannot delete a active store ',
        text: "",
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
       
      })
    }
    if(!(storeInfoRequest.status)){

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
      this.http.delete<StoreInfoRequest>(environment.smartSafeAPIUrl + "/storeinfo/" + storeInfoRequest.id, this.httpOptions).subscribe(
        res => {
          console.log(res);
          //event.confirm.resolve(event.newData);
          this.service.typeDelete();
          this.getAllStoresList();
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

corp=new Corp();
  corps:Corp[];
getCropInfoList(){
  return this.http.get<Corp[]>(environment.smartSafeAPIUrl + '/corp/all/');

}
getAllCropInfoList(){
  return this.getCropInfoList().
    subscribe((data) => {
      console.log(data);
      this.corps = data;
      
      this.changeDetectorRefs.markForCheck();
    });
}

onCorpSelected(cropName:string){
  // this.getAllCropInfoList();

}





  ngOnInit() {
    this.getAllCropInfoList();
    this.getAllStoresList()
    // this.router.navigate(["/dashboard/charts-reports"]);
  }

  displayStyle1 = "none";
  dynamicText2:string;

  openPopup1() {
    this.displayStyle1 = "block";
  }

  onSaveConfirm1() {

        this.dynamicText2 = "Hey.... Now, You need to Create User...";
        this.openPopup1();
        this.popupid = "raise_request";
        
  }

  closePopup() {
    
    this.displayStyle= "none";
    this.onSaveConfirm1();
   
  }
    
  closePopup1() {
    this.displayStyle1 = "none";
    if(this.dynamicText2=="Hey.... Now, You need to Create User..."){
      this.router.navigateByUrl('/user-management/add-user-management');
    }
  }

}
