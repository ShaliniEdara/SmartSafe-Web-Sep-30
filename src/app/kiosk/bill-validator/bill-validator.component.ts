import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';
import { BillValidatorInfoRequest } from 'app/model/billValidatorInfoRequest';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bill-validator',
  templateUrl: './bill-validator.component.html',
  styleUrls: ['./bill-validator.component.scss'],
  providers: [NGXToastrService]
})
export class BillValidatorComponent implements OnInit {

  @ViewChild("addClassForm", null) addClassForm: NgForm;


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
  
  displayStyle = "none";
  dynamicText:string;
  popupid:string = "raise_request";
  openPopup() {
    this.displayStyle = "block";
}

  constructor(private http: HttpClient,
    private router: Router,
    private service: NGXToastrService,
    private changeDetectorRefs: ChangeDetectorRef) {
  }
  getBillValidatorList() {
    return this.http.get<BillValidatorInfoRequest[]>(environment.smartSafeAPIUrl + '/billValidator/all');
  }
  getActiveBillValidatorList() {
    return this.http.get<BillValidatorInfoRequest[]>(environment.smartSafeAPIUrl + '/billValidator/active/all');
  }
  getInActiveBillValidatorList() {
    return this.http.get<BillValidatorInfoRequest[]>(environment.smartSafeAPIUrl + '/billValidator/inactive/all');
  }
  getDeletedBillValidatorList() {
    return this.http.get<BillValidatorInfoRequest[]>(environment.smartSafeAPIUrl + '/billValidator/deleted/all');
  }
  getAllBillValidatorList() {
    return this.getBillValidatorList().
      subscribe((data) => {
        console.log(data);
        this.billValidators = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  getAllActiveBillValidatorList() {
    return this.getActiveBillValidatorList().
      subscribe((data) => {
        console.log(data);
        this.billValidators = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  getAllInActiveBillValidatorList() {
    return this.getInActiveBillValidatorList().
      subscribe((data) => {
        console.log(data);
        this.billValidators = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  getAllDeletedBillValidatorList() {
    return this.getDeletedBillValidatorList().
      subscribe((data) => {
        console.log(data);
        this.billValidators = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  addBillValidator() {
    this.http.post<BillValidatorInfoRequest>(environment.smartSafeAPIUrl + '/billValidator/', this.billValidator).subscribe(
      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        this.service.addSuccess();
        this.getAllBillValidatorList();
        this.addClassForm.reset();
        this.dynamicText = "Billvalidator Created Succesfully.";
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
    console.log(JSON.stringify(this.billValidator));
    this.getAllBillValidatorList();
  }
  editBillValidator(billValidator: BillValidatorInfoRequest ) {

     localStorage.setItem('editbillValidator', JSON.stringify(billValidator));
    
    this.router.navigate(["/kiosk/update-billValidator"]);

  }



  billValidatordelete(billValidator: BillValidatorInfoRequest) {
    console.log('coming into delete')
    if(billValidator.active){
      console.log('coming inside active true')
      Swal.fire({
        title: 'You cannot delete a active bill validator ',
        text: "",
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
       
      })
    }
    if(!(billValidator.active)){
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
        this.http.delete<BillValidatorInfoRequest>(environment.smartSafeAPIUrl + "/billValidator/deactivate/" + billValidator.id, this.httpOptions).subscribe(
          res => {
            console.log(res);
            //event.confirm.resolve(event.newData);
            this.service.typeDelete();
            this.getAllBillValidatorList();
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
      this.getAllBillValidatorList()
    } else if (this.filterOption === 'active') {
      this.getAllActiveBillValidatorList();
      //return this.users.filter(user => user.active);
    } else if (this.filterOption === 'inactive') {
      this.getAllInActiveBillValidatorList()
      //return this.users.filter(user => !user.active);
    } else if (this.filterOption === 'deleted') {
      this.getAllDeletedBillValidatorList()
      //return this.users.filter(user => user.deleted); // Assuming you have a deleted property
    }
    //return this.users;
  }


  ngOnInit() {
    this.getAllActiveBillValidatorList();
  }

displayStyle1 = "none";
  dynamicText2:string;

  openPopup1() {
    this.displayStyle1 = "block";
  }

  onSaveConfirm1() {

        this.dynamicText2 = "Hey.... Now, You need to Create Printer...";
        this.openPopup1();
        this.popupid = "raise_request";
        
  }

  closePopup() {
    
    this.displayStyle= "none";
    this.onSaveConfirm1();
   
  }
    
  closePopup1() {
    this.displayStyle1 = "none";
    if(this.dynamicText2=="Hey.... Now, You need to Create Printer..."){
      this.router.navigateByUrl('/kiosk/printer');
    }
  }

}
