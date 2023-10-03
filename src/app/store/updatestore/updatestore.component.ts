import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StoreInfoRequest } from 'app/model/storeInfoRequest';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-updatestore',
  templateUrl: './updatestore.component.html',
  styleUrls: ['./updatestore.component.scss'],
  providers: [NGXToastrService]
})
export class UpdatestoreComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*' ,
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  } 

   storeInfoRequest = new StoreInfoRequest();
   storeInfoRequests: StoreInfoRequest[];

   constructor(private http: HttpClient, private service: NGXToastrService,private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    

    this.storeInfoRequest = JSON.parse(localStorage.getItem('editStore'));
    // let a= (localStorage.getItem('id'))
    // console.log('this is number ' + a)
    // console.log(this.storeInfoRequest.id)

    // return this.http.get<StoreInfoRequest>(environment.smartSafeAPIUrl + "/storeinfo/" + a,this.httpOptions).subscribe(data =>{
    //   console.log(data)
  
    //   this.storeInfoRequest = data
    //   console.log('print the store ' + this.storeInfoRequest)
    //  })
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

  updateStore() {
    this.http.put<StoreInfoRequest>(environment.smartSafeAPIUrl +"/storeinfo/"+this.storeInfoRequest.id, this.storeInfoRequest, this.httpOptions).subscribe(
      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        this.service.updateSuccess();
        this.getAllStoresList();
        

      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        this.service.typeWarning();
      });

  
  console.log(JSON.stringify(this.storeInfoRequest));
}
}

