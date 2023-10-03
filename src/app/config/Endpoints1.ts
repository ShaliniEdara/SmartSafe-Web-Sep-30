export class EndPoints {

    public static readonly BASE_URL: string = "http://localhost:9002";
    static PRINT_EMPLOYEE_REPORT(userId:string):string{
        // return this.BASE_URL+"/reports/employeeReport/"+userId;
        return this.BASE_URL+"/reports/employeeReport/"+userId;
    }
    static DOWNLOAD_EMPLOYEE_REPORT_TO_EXCEL(userId:string):string{
        // return this.BASE_URL+"/reports/employeeReport/"+userId;
        return this.BASE_URL+"/reports/employeeReportExport/"+userId;
    }
    static DOWNLOAD_EOD_REPORT_TO_EXCEL(userId:string):string{
        // return this.BASE_URL+"/reports/employeeReport/"+userId;
        return this.BASE_URL+"/reports/EODReportExport/"+userId;
    }

   
    static GETINSERTBILLSREPORT(transactionNumber:string){
        return this.BASE_URL+"reports/insertBillsReport/"+transactionNumber;
    }
    static GETEODREPORT(storeName:string,toDay:boolean){
        return this.BASE_URL+"reports/EODReportExport/"+storeName+"/"+toDay;
    }
    static GETSTANDBANKREPORT(storeName:string,sDay:string,endDay:string,safeType:string){
        return this.BASE_URL+"reports/standBankReportExport/"+storeName+"/"+safeType+"/"+sDay+"/"+endDay;
    }
}