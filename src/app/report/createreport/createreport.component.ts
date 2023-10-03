import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'app/model/role';
import { StoreInfoRequest } from 'app/model/storeInfoRequest';
import { UserAccount } from 'app/model/user';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-createreport',
  templateUrl: './createreport.component.html',
  styleUrls: ['./createreport.component.scss'],
  providers: [NGXToastrService]
})
export class CreatereportComponent implements OnInit {

  @ViewChild("addClassForm", null) addClassForm: NgForm;


  store = new StoreInfoRequest();

  ishideToDate: boolean
  ishideFromDate: boolean
  ishideUserName: boolean
  ishideUserType: boolean
  ishideStoreLocation: boolean
  ishideStoreName: boolean
  isStandBankRadio: boolean;
  typeOfStandBank: string;

  radioButtonType: string="Bills";

  storeid:number;
  storeNameDy: string;
  dataResponce: any[];
  dataStoreResponce: Array<StoreInfoRequest> = [];
  empId: string;
  stores: StoreInfoRequest[];

  roles: Array<Role> = [];
  employees: UserAccount[];
  selectedStore = new StoreInfoRequest();
  selectedUser: UserAccount;
  selectedUser1: UserAccount[];
  userInfo:UserAccount[];
  user :string;
  startDate: string;
  endDate: string;

  day:boolean;
  order_status:string="Delivered";

  constructor(private http: HttpClient,
    private router: Router,
    private service: NGXToastrService,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.getAlluserList();
    this.getAllStoresList();
    this.changeDivSection("Bills");
    this.isStandBankRadio = true;
    this.user=localStorage.getItem('user');
  }
  getAlluserList(){
    this.service.users().subscribe(data=>{
      this.userInfo=data;
      console.log(data);
    })
  }
  changeDivSection(type: string) {
    if (type == "Bills") {
      this.ishideToDate = false;
      this.ishideFromDate = false;
      this.ishideUserName = false;
      this.ishideUserType = false;
      this.ishideStoreLocation = false;
      this.ishideStoreName = false;
      this.isStandBankRadio = true;

      this.radioButtonType = type;
      // this.service.getInsertBillsReport("12").subscribe(data=>{


      // })

    }
    else if (type == "EOD") {
      this.ishideStoreLocation = false;
      this.ishideStoreName = false;
      this.ishideToDate = true;
      this.ishideFromDate = true;
      this.ishideUserName = true;
      this.ishideUserType = true;
      this.isStandBankRadio = true;


      this.radioButtonType = type;
    }
    else if (type == "StandBank") {
      this.ishideStoreLocation = false;
      this.ishideStoreName = false;
      this.ishideToDate = false;
      this.ishideFromDate = false;
      this.ishideUserName = true;
      this.ishideUserType = true;
      this.isStandBankRadio = false;

      // this.service.getStandBankReport("XYZ",this.startDate,this.endDate,'MAINSAFE').subscribe(data=>{


      // })
      this.radioButtonType = type;
    }
    else if (type == "ChangeRequest") {
      this.ishideStoreLocation = false;
      this.ishideStoreName = false;
      this.ishideToDate = false;
      this.ishideFromDate = false;
      this.ishideUserName = true;
      this.ishideUserType = true;
      this.isStandBankRadio = true;

      this.radioButtonType = type;

    }
    else {
      this.typeOfStandBank = type;
    }
  }

  getStoreList() {
    return this.http.get<StoreInfoRequest[]>(environment.smartSafeAPIUrl + '/storeinfo/all/assignedstoresforreport');
  }

  getAllStoresList() {
    return this.getStoreList().
      subscribe((data) => {
        console.log(data);
        this.stores = data;
        this.changeDetectorRefs.markForCheck();
      });
  }

  getStoresByStoreName(storeName: string) {
    return this.http.get<StoreInfoRequest>(environment.smartSafeAPIUrl + '/storeinfo/' + storeName);
  }

  onstoreChange(storeName: string) {
    this.storeNameDy = storeName;
    this.getStoresByStoreName(storeName).
    subscribe((data) => {
      this.selectedStore = data;
        console.log("storename",storeName);
        localStorage.setItem("storename for report",storeName);
        this.changeDetectorRefs.markForCheck();
      })
  }

  findUserByRole(storeName:string,role: string) {
    return this.http.get<UserAccount[]>(environment.smartSafeAPIUrl + "/userInfo/store/" +storeName+"/"+role);
  }

  onRoleChange(role: any) {
    var storeName=localStorage.getItem("storename for report");
    console.log(localStorage.getItem("storename for report"));
    return this.findUserByRole(storeName,role).
      subscribe((data) => {
        console.log(data);
        this.employees = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  

  onSelectUserId(userId: number) {
    this.empId = userId.toString();
  }
  
  startDateC(startDate) {
    this.startDate = startDate.target.value;
  }
  endDateC(endDate) {
    this.endDate = endDate.target.value;
  }
  generateclass() {

    switch (this.radioButtonType) {
      case "Bills": {
        let request = {
          'startDate': this.startDate,
          'endDate': this.endDate,
          'startTime':"20:00:00",
          'endTime':"20:00:00"
        };

        this.service.gotoEmployeeReportToExcel(this.empId+"/"+request.startDate+"/"+request.endDate).subscribe(data =>{

    //    this.service.gotoEmployeeReport(this.empId + "", request).subscribe(data => {
          //data.name=this.selectedUser.username;
          // data.reportName = "Manager Report";
          // this.dataResponce = data.data[0].data;

          // let storeResponse = new StoreInfoRequest();
          // storeResponse.corpStoreNo = data.storeInfoResponse.corpStoreNo;
          // storeResponse.storeName = data.storeInfoResponse.storeName;
          // storeResponse.serialNumber = data.storeInfoResponse.serialNumber;
          // this.dataStoreResponce.push(storeResponse); //({values:data.storeInfoResponse})
          // console.log(this.dataStoreResponce);
          //this.ipcService.send('message',data);

          //Excel start here..

          console.log(data)
          console.log('coming here')

          const blob = new Blob([data], { type: 'application/application/vnd.openxalformats-officedocument.spreadsheetml' });



          const edata = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = edata;
          link.download = 'EmployeeBillEntryReport.xlsx';


          link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
          setTimeout(function () {
            window.URL.revokeObjectURL(edata);
            link.remove();
          }, 100);

          this.service.generateSuccess();
          this.addClassForm.reset();

          //end here
        });
        break;
      }
      case "EOD": {

        let day=true;

        let sId=0;
        let userId=0;
        this.stores.forEach((x) => {
            if (x.storeName == this.storeNameDy) {
              sId = (x.id);
            }
          });
        this.userInfo.forEach((x)=>{
          if(x.id==1){
            userId=x.id;
          }
        })
        this.service.gotoEODReportToExcel(this.storeNameDy+"/"+day).subscribe(data => {

          //Excel start here..
          

          console.log(data)
          console.log('coming here')

          const blob = new Blob([data], { type: 'application/application/vnd.openxalformats-officedocument.spreadsheetml' });



          const edata = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = edata;
          link.download = 'EndOfTheReport.xlsx';


          link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
          setTimeout(function () {
            window.URL.revokeObjectURL(edata);
            link.remove();
          }, 100);

          this.service.generateSuccess();
          this.addClassForm.reset();




          //end here


        })
        
        break;
      }
      case "StandBank": {
        this.service.getStandBankReport(this.storeNameDy+"/"+this.typeOfStandBank+"/"+this.startDate+"/"+this.endDate).subscribe(data => {

          //Excel start here..

          console.log(data)
          console.log('coming here')

          const blob = new Blob([data], { type: 'application/application/vnd.openxalformats-officedocument.spreadsheetml' });



          const edata = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = edata;
          link.download = 'StandbankReport.xlsx';


          link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
          setTimeout(function () {
            window.URL.revokeObjectURL(edata);
            link.remove();
          }, 100);

          this.service.generateSuccess();
          this.addClassForm.reset();

          //end here

        })
        break;
      }
      case "ChangeRequest": {
       
        this.service.getChangerequestExcelReport(this.storeNameDy+"/"+this.order_status+"/"+this.startDate+"/"+this.endDate).subscribe(data => {

          //Excel start here..

          console.log(data)
          console.log('coming here')

          const blob = new Blob([data], { type: 'application/application/vnd.openxalformats-officedocument.spreadsheetml' });



          const edata = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = edata;
          link.download = 'ChangeRequestReport.xlsx';


          link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
          setTimeout(function () {
            window.URL.revokeObjectURL(edata);
            link.remove();
          }, 100);

          this.service.generateSuccess();
          this.addClassForm.reset();

          //end here

        })
        break;
      }
    }

  }

  generatReport() {
    let request = {
      'startDate': this.startDate,
      'endDate': this.endDate
    };

    console.log("into the excel report")
    this.service.gotoEmployeeReportToExcel(this.empId + "/" + request.startDate + "/" + request.endDate).subscribe(x => {
      console.log(x)
      console.log('coming here')

      const blob = new Blob([x], { type: 'application/application/vnd.openxalformats-officedocument.spreadsheetml' });



      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'EmployeeBillEntryReport.xlsx';


      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      setTimeout(function () {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    }
    )

  }
}
