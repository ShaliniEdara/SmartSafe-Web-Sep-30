//import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'app/model/role';

import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';
 import swal from 'sweetalert2';



@Component({
  selector: 'app-createrole',
  templateUrl: './createrole.component.html',
  styleUrls: ['./createrole.component.scss'],
  providers: [NGXToastrService]
})
export class CreateroleComponent implements OnInit {

  @ViewChild("addClassForm", null) addClassForm: NgForm;


  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*' ,
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  }

  role = new Role();
  roles: Role[];
  roleFeatures: string[] = ['All', 'InsertBills', 'Doors', 'Admin', 'ChangeRequestDoors', 'StandBank', 'OTPScreen', 'Valut'
  ];
  
  SelectedFeatureNames: string[];
  searchText: string = '';
  constructor(private http: HttpClient,
    private router: Router,
    private service: NGXToastrService,
    private changeDetectorRefs: ChangeDetectorRef) {
  }
  getRoleList() {

    return this.http.get<Role[]>(environment.smartSafeAPIUrl + '/role/all');
  }
  getAllRolesList() {
    return this.getRoleList().
      subscribe((data) => {
        console.log(data);
        this.roles = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  addRole() {
    var role = new Role();
    role.features = this.SelectedFeatureNames;
    this.http.post<Role>(environment.smartSafeAPIUrl + '/role/', this.role).subscribe(
      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        this.service.addSuccess();
        this.getAllRolesList();
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
    console.log(JSON.stringify(this.role));
    this.getAllRolesList();
  }
  //here edit for role
  editRole(role) {
    
    
     localStorage.setItem('editRole', JSON.stringify(role));
    
    this.router.navigate(["/role/updaterole"]);

  }

deleteRole(role: Role) {
  console.log('coming into delete' + role.active)

  if(role.active){
    console.log('coming inside active true')
    swal.fire({
      title: 'You cannot delete a active User ',
      text: "",
      type: 'warning',
      // showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      // confirmButtonText: 'Yes, delete it!'

    })

  }
  if(!(role.active)){
  swal.fire({
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
      this.http.delete<Role>(environment.smartSafeAPIUrl + "/role/" + role.id, this.httpOptions).subscribe(
        res => {
          console.log(res);
          //event.confirm.resolve(event.newData);
          this.service.typeDelete();
          this.getAllRolesList();
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        });
      swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })

  }
}

  ngOnInit() {
    this.getAllRolesList();
  }


}
