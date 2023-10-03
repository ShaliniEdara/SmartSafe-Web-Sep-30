import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'app/model/role';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-assign-permission',
  templateUrl: './assign-permission.component.html',
  styleUrls: ['./assign-permission.component.scss'],
  providers: [NGXToastrService]
})
export class AssignPermissionComponent implements OnInit {
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
  roleWebModule: string[] = ['All', 'Dashboard', 'Role Management', 'User Management', 'Kiosk Management', 'Assign User', 'Assign Store', 'Reports', 'Change Pin'
];

SelectedWebModuleNames: string[];
searchText: string = '';

roleFeatures: string[] = ['All', 'InsertBills', 'Doors', 'Admin', 'ChangeRequestDoors', 'StandBank', 'OTPScreen', 'Valut'
];

SelectedFeatureNames: string[];

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

  addWebModule() {
    var role = new Role();
    role.webModule = this.SelectedWebModuleNames;

    role.features = this.SelectedFeatureNames;

    this.http.post<Role>(environment.smartSafeAPIUrl + '/role/addwebmodule', this.role).subscribe(

      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        this.service.addAssignSuccess();
        this.getAllRolesList();
        
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        this.service.typeWarning();
      });
    console.log(JSON.stringify(this.role));
    this.getAllRolesList();
      
  }

  ngOnInit() {
    this.getAllRolesList();
  }

}
