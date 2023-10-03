import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { NGXToastrService } from 'app/service/toastr.service';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { BillValidatorInfoRequest } from 'app/model/billValidatorInfoRequest';

@Component({
  selector: 'app-update-bill-validator',
  templateUrl: './update-bill-validator.component.html',
  styleUrls: ['./update-bill-validator.component.scss'],
  providers: [NGXToastrService]
})
export class UpdateBillValidatorComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  }
  billValidator = new BillValidatorInfoRequest();
  billValidators : BillValidatorInfoRequest[];
  
  constructor(private http: HttpClient,
    private router: Router,
    private service: NGXToastrService,
    private changeDetectorRefs: ChangeDetectorRef) {
  }
  ngOnInit() {
    this.billValidator = JSON.parse(localStorage.getItem('editbillValidator'));
  }

  getBillValidatorList() {
    return this.http.get<BillValidatorInfoRequest[]>(environment.smartSafeAPIUrl + '/billValidator/all');
  }
  getAllBillValidatorList() {
    return this.getBillValidatorList().
      subscribe((data) => {
        console.log(data);
        this.billValidators = data;
        this.changeDetectorRefs.markForCheck();
      });
  }

  updateBillValidator(id:number) {
    
    this.http.put<BillValidatorInfoRequest>(environment.smartSafeAPIUrl + "/billValidator/"+id, this.billValidator, this.httpOptions).subscribe(
      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        this.service.updateSuccess();
        this.getAllBillValidatorList();

      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        this.service.typeWarning();
      });

  
  console.log(JSON.stringify(this.billValidator));
}
}

 


  
  


