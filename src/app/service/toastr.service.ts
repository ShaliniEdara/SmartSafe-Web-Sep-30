import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EndPoints } from '../config/Endpoints';
import { UserAccount } from 'app/model/user';
import { Observable } from 'rxjs';

@Injectable()
export class NGXToastrService {
    constructor(public toastr: ToastrService,private httpClient: HttpClient) { }

    // Success Type
    addSuccess() {
        this.toastr.success('Sucessfully added!');
    }
    addAssignSuccess() {
        this.toastr.success('Sucessfully Assign!');
    }
    updateSuccess() {
        this.toastr.success('Sucessfully updated!');
    }
    loginSuccess() {
        this.toastr.success('Sucessfully Login!');
    }
    
    passwordChangeSuccess() {
        this.toastr.success('Password Changed Sucessfully !');
    }
    typeDelete() {
        this.toastr.success('Deleted Sucessfully !');
    }

    // Success Type
    typeInfo() {
        this.toastr.info('We do have the Kapua suite available.', 'Turtle Bay Resort');
    }

    // Success Type
    typeWarning() {
        this.toastr.warning('Sorry! Failed.');
    }
    typeCustommessage(message){
        this.toastr.warning(message)
    }

    // Success Type
    typeError() {
        this.toastr.error('I do not think that word means what you think it means.', 'Inconceivable!');
    }
    generateSuccess() {
        this.toastr.success('Sucessfully generated!');
    }

    showMessage(message){
        this.toastr.error(message);
    
    }

    // Custom Type
    typeCustom() {
        this.toastr.success('<span class="text-danger">Message in red.</span>', null, { enableHtml: true });
    }

    //Progress bar
    progressBar() {
        this.toastr.info('We do have the Kapua suite available.', 'Turtle Bay Resort', { "progressBar": true });
    }

    // Timeout
    timeout() {
        this.toastr.error('I do not think that word means what you think it means.', 'Timeout!', { "timeOut": 2000 });
    }


    //Dismiss toastr on Click
    dismissToastOnClick() {
        this.toastr.info('We do have the Kapua suite available.', 'Turtle Bay Resort', { "tapToDismiss": true });
    }
    // Remove current toasts using animation
    clearToast() {
        this.toastr.clear()
    }

    // Show close button
    showCloseButton() {
        this.toastr.info('Have fun storming the castle!', 'Miracle Max Says', { closeButton: true });
    }
    // Enable  HTML
    enableHtml() {
        this.toastr.info('<i>Have fun <b>storming</b> the castle!</i>', 'Miracle Max Says', { enableHtml: true });
    }
    // Title Class
    titleClass() {
        this.toastr.info('Have fun storming the castle!', 'Miracle Max Says', { titleClass: 'h3' });
    }
    // Message Class
    messageClass() {
        this.toastr.info('Have fun storming the castle!', 'Miracle Max Says', { messageClass: 'text-uppercase' });
    }


    // gotoEmployeeReport(userId:string,data:any){
    //     return this.httpClient.post<any>(EndPoints.PRINT_EMPLOYEE_REPORT("132"),data);
    //   }
    gotoEmployeeReportToExcel(path:string) :Observable<Blob>{
        console.log('printing this')
        return this.httpClient.get(EndPoints.DOWNLOAD_EMPLOYEE_REPORT_TO_EXCEL(path),{ responseType: 'blob'});
      }
      gotoEODReportToExcel(path:string) :Observable<Blob>{
        console.log('printing this')
        return this.httpClient.get(EndPoints.DOWNLOAD_EOD_REPORT_TO_EXCEL(path),{ responseType: 'blob'});
      }


      //new
  
    // getInsertBillsReport(transactionNumber:string){
    //     return this.httpClient.get<object>(EndPoints.GETINSERTBILLSREPORT(transactionNumber));
    // }
    // getEODReport(storeName:string,toDay:boolean){
    //     return this.httpClient.get<any>(EndPoints.GETEODREPORT(storeName,toDay));
    // }
    getStandBankReport(path:string) :Observable<Blob>{
        return this.httpClient.get(EndPoints.GETSTANDBANKREPORT(path),{responseType: 'blob'});
    }
    getChangerequestExcelReport(path:string) :Observable<Blob>{
        return this.httpClient.get(EndPoints.GETCHANGEREQUESTREPORT(path),{responseType: 'blob'});
    }
    
    users(){
        return this.httpClient.get<Array<UserAccount>>(EndPoints.LIST_USERS());
    }
}