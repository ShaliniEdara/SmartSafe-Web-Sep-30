//import { Component, OnInit } from '@angular/core';
//import { NGXToastrService } from 'app/service/toastr.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Corp } from 'app/model/corp';
import { Role } from 'app/model/role';

import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';
 import swal from 'sweetalert2';
@Component({
  selector: 'app-createcropmaster',
  templateUrl: './createcropmaster.component.html',
  styleUrls: ['./createcropmaster.component.scss'],
  providers: [NGXToastrService]
})
export class CreatecropmasterComponent implements OnInit {

  @ViewChild("addClassForm", null) addClassForm: NgForm;


  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*' ,
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  }
  constructor(private http: HttpClient,
    private router: Router,
    private service: NGXToastrService,
    private changeDetectorRefs: ChangeDetectorRef) {
  }

  corp = new Corp();
  corps: Corp[];

  displayStyle = "none";
   dynamicText:string;


   getCropList() {
    return this.http.get<Corp[]>(environment.smartSafeAPIUrl + '/corp/all');
  }
  getActiveCropList() {
    return this.http.get<Corp[]>(environment.smartSafeAPIUrl + '/corp/active/all');
  }

  getInActiveCropList() {
    return this.http.get<Corp[]>(environment.smartSafeAPIUrl + '/corp/inactive/all');
  }
  getDeletedCropList() {
    return this.http.get<Corp[]>(environment.smartSafeAPIUrl + '/corp/deleted/all');
  }
  getAllCropList() {
    return this.getCropList().
      subscribe((data) => {
        console.log(data);
        this.corps = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  getAllActiveCropList() {
    return this.getActiveCropList().
      subscribe((data) => {
        console.log(data);
        this.corps = data;
        this.changeDetectorRefs.markForCheck();
      });
  }

  getAllInActiveCropList() {
    return this.getInActiveCropList().
      subscribe((data) => {
        console.log(data);
        this.corps = data;
        this.changeDetectorRefs.markForCheck();
      });
  }

  getAllDeletedCropList() {
    return this.getDeletedCropList().
      subscribe((data) => {
        console.log(data);
        this.corps = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  addCrop() {
    this.http.post<Corp>(environment.smartSafeAPIUrl + '/corp/', this.corp).subscribe(
      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        this.service.addSuccess();

        this.getAllCropList();
        this.addClassForm.reset();
        this.dynamicText = "Printer Created Succesfully.";
        // this.openPopup();
        // this.popupid = "raise_request";
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        //this.service.typeWarning();
        
      });
    console.log(JSON.stringify(this.corp));
    this.getAllCropList();
    
  }

  editCrop(corp: Corp ) {

    localStorage.setItem('editCrop', JSON.stringify(corp));
   
   this.router.navigate(["/cropmaster/updatecrop"]);

 }

  deleteCrop(corp: Corp) {
    console.log('coming into delete')
  
    if(corp.active){
      console.log('coming inside active true')
      Swal.fire({
        title: 'You cannot delete a active printer ',
        text: "",
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
       
      })
    }
    if(!(corp.active)){
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
        this.http.delete<Corp>(environment.smartSafeAPIUrl + "/corp/deactivate/" + corp.id, this.httpOptions).subscribe(
          res => {
            console.log(res);
            //event.confirm.resolve(event.newData);
            this.service.typeDelete();
            this.getAllCropList();
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
filterOption: string = 'active'; // default value
  onFilterChange(): void {debugger;
    console.log('Selected filter option-----------:', this.filterOption);
    // Add your logic here to handle the filter change
    if (this.filterOption === 'all') {
      this.getAllCropList()
    } else if (this.filterOption === 'active') {
      this.getAllActiveCropList();
      //return this.users.filter(user => user.active);
    } else if (this.filterOption === 'inactive') {
      this. getAllInActiveCropList()
      //return this.users.filter(user => !user.active);
    } else if (this.filterOption === 'deleted') {
      this.getAllDeletedCropList()
      //return this.users.filter(user => user.deleted); // Assuming you have a deleted property
    }
    //return this.users;
  }

ngOnInit() {
  this.getAllActiveCropList();
  }

  }


