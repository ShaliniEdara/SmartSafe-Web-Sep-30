import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrinterInfoRequest } from 'app/model/printerInfoRequest';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-update-printer',
  templateUrl: './update-printer.component.html',
  styleUrls: ['./update-printer.component.scss'],
  providers: [NGXToastrService]
})
export class UpdatePrinterComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*' ,
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  } 
  printer = new PrinterInfoRequest();
  printers:PrinterInfoRequest[];

  constructor(private http: HttpClient, private service: NGXToastrService,private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.printer = JSON.parse(localStorage.getItem('editPrinter'));
  }
  getPrinterList() {
    return this.http.get<PrinterInfoRequest[]>(environment.smartSafeAPIUrl + '/printer/all');
  }
  getAllPrinterList() {
    return this.getPrinterList().
      subscribe((data) => {
        console.log(data);
        this.printers = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  updatePrinter(id:number) {
    
    this.http.put<PrinterInfoRequest>(environment.smartSafeAPIUrl + "/printer/"+id, this.printer, this.httpOptions).subscribe(
      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        this.service.updateSuccess();
        this.getAllPrinterList();

      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        this.service.typeWarning();
      });

  
  console.log(JSON.stringify(this.printer));
}
}
