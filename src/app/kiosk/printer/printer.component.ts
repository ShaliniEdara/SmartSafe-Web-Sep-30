import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PrinterInfoRequest } from 'app/model/printerInfoRequest';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-printer',
  templateUrl: './printer.component.html',
  styleUrls: ['./printer.component.scss'],
  providers: [NGXToastrService]
})
export class PrinterComponent implements OnInit {

  @ViewChild("addClassForm", null) addClassForm: NgForm;

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  }
  
   printer = new PrinterInfoRequest();
   printers : PrinterInfoRequest[];
  

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
  getPrinterList() {
    return this.http.get<PrinterInfoRequest[]>(environment.smartSafeAPIUrl + '/printer/all');
  }
  getActivePrinterList() {
    return this.http.get<PrinterInfoRequest[]>(environment.smartSafeAPIUrl + '/printer/active/all');
  }
  getInActivePrinterList() {
    return this.http.get<PrinterInfoRequest[]>(environment.smartSafeAPIUrl + '/printer/inactive/all');
  }
  getDeletedPrinterList() {
    return this.http.get<PrinterInfoRequest[]>(environment.smartSafeAPIUrl + '/printer/deleted/all');
  }
  getAllPrinterList() {
    return this.getPrinterList().
      subscribe((data) => {
        console.log(data);
        this.printers = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  
  getAllActivePrinterList() {
    return this.getActivePrinterList().
      subscribe((data) => {
        console.log(data);
        this.printers = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  getAllInActivePrinterList() {
    return this.getInActivePrinterList().
      subscribe((data) => {
        console.log(data);
        this.printers = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  getAllDeletedPrinterList() {
    return this.getDeletedPrinterList().
      subscribe((data) => {
        console.log(data);
        this.printers = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  addPrinter() {
    this.http.post<PrinterInfoRequest>(environment.smartSafeAPIUrl + '/printer/', this.printer).subscribe(
      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        this.service.addSuccess();

        this.getAllPrinterList();
        this.addClassForm.reset();
        this.dynamicText = "Printer Created Succesfully.";
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
        
      });
    console.log(JSON.stringify(this.printer));
    this.getAllPrinterList();
    
  }

  editAddPrinter(printer: PrinterInfoRequest ) {

    localStorage.setItem('editPrinter', JSON.stringify(printer));
   
   this.router.navigate(["/kiosk/update-printer"]);

 }

  printerdelete(printer: PrinterInfoRequest) {
    console.log('coming into delete')
  
    if(printer.active){
      console.log('coming inside active true')
      Swal.fire({
        title: 'You cannot delete a active printer ',
        text: "",
        type: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
       
      })
    }
    if(!(printer.active)){
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
        this.http.delete<PrinterInfoRequest>(environment.smartSafeAPIUrl + "/printer/deactive/" + printer.id, this.httpOptions).subscribe(
          res => {
            console.log(res);
            //event.confirm.resolve(event.newData);
            this.service.typeDelete();
            this.getAllPrinterList();
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
      this.getAllPrinterList()
    } else if (this.filterOption === 'active') {
      this.getAllActivePrinterList();
      //return this.users.filter(user => user.active);
    } else if (this.filterOption === 'inactive') {
      this.getAllInActivePrinterList()
      //return this.users.filter(user => !user.active);
    } else if (this.filterOption === 'deleted') {
      this.getAllDeletedPrinterList()
      //return this.users.filter(user => user.deleted); // Assuming you have a deleted property
    }
    //return this.users;
  }

  ngOnInit() {
    this.getAllActivePrinterList();
  }

displayStyle1 = "none";
  dynamicText2:string;

  openPopup1() {
    this.displayStyle1 = "block";
  }

  onSaveConfirm1() {

        this.dynamicText2 = "Hey.... Now, You need to Create Lock...";
        this.openPopup1();
        this.popupid = "raise_request";
        
  }

  closePopup() {
    
    this.displayStyle= "none";
    this.onSaveConfirm1();
   
  }
    
  closePopup1() {
    this.displayStyle1 = "none";
    if(this.dynamicText2=="Hey.... Now, You need to Create Lock..."){
      this.router.navigateByUrl('/kiosk/locks');
    }
  }

}

