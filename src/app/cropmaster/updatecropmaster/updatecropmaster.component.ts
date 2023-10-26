import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Corp } from 'app/model/corp';
import { PrinterInfoRequest } from 'app/model/printerInfoRequest';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-updatecropmaster',
  templateUrl: './updatecropmaster.component.html',
  styleUrls: ['./updatecropmaster.component.scss'],
  providers: [NGXToastrService]
})
export class UpdatecropmasterComponent implements OnInit {
 
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*' ,
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  } 
  corp = new Corp();
  corps: Corp[];

  constructor(private http: HttpClient, private service: NGXToastrService,private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.corp = JSON.parse(localStorage.getItem('editCrop'));
  }
  getCorpList() {
    return this.http.get<Corp[]>(environment.smartSafeAPIUrl + '/corp/all');
  }
  getAllCorpList() {
    return this.getCorpList().
      subscribe((data) => {
        console.log(data);
        this.corps = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  updateCorp(id:number) {
    
    this.http.put<Corp>(environment.smartSafeAPIUrl + "/corp/"+id, this.corp, this.httpOptions).subscribe(
      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        this.service.updateSuccess();
        this.getAllCorpList();

      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        this.service.typeWarning();
      });

  
  console.log(JSON.stringify(this.corp));
}
}
