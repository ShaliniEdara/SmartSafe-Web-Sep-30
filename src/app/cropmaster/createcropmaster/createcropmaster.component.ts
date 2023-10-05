//import { Component, OnInit } from '@angular/core';
//import { NGXToastrService } from 'app/service/toastr.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'app/model/role';

import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';
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

  ngOnInit() {
  }

}
