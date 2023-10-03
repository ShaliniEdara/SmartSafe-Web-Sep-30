 import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
 import { Role } from 'app/model/role';
 import { environment } from 'environments/environment';
 import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
 import { NGXToastrService } from 'app/service/toastr.service';
 import Swal from 'sweetalert2';
 

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss'],
  providers: [NGXToastrService]
})
export class UpdateRoleComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*' ,
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  }

  constructor(private http: HttpClient, private service: NGXToastrService,private changeDetectorRefs: ChangeDetectorRef) { }
  role = new Role();
  roleFeatures: string[] = ['All', 'InsertBills', 'Doors', 'Admin', 'ChangeRequestDoors', 'StandBank', 'OTPScreen', 'Valut'
  ];
  ngOnInit() {
    this.role =  JSON.parse(localStorage.getItem('editRole'))
    console.log(this.role)
    console.log('role feture' + this.role.features)

  }

//here
  updateRole(){
    this.http.put<Role>(environment.smartSafeAPIUrl +"/role/"+this.role.id, this.role, this.httpOptions).subscribe(
      res => {
        console.log(res);
        
        this.service.updateSuccess();
        
        

      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
          console.log(err.error.message)
        }
        this.service.typeWarning();
      });
      

  
  console.log(JSON.stringify(this.role));
}




  }

