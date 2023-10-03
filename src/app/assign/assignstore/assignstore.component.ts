import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BillValidatorInfoRequest } from 'app/model/billValidatorInfoRequest';
import { KioskInfoRequest } from 'app/model/kioskInfoRequest';
import { LocksInfoRequest } from 'app/model/locksInfoRequest';
import { PrinterInfoRequest } from 'app/model/printerInfoRequest';
import { StoreInfoRequest } from 'app/model/storeInfoRequest';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-assignstore',
  templateUrl: './assignstore.component.html',
  styleUrls: ['./assignstore.component.scss'],
  providers: [NGXToastrService]

})
export class AssignstoreComponent implements OnInit {
  @ViewChild("addClassForm", null) addClassForm: NgForm;

  store = new StoreInfoRequest();
  stores: StoreInfoRequest[];
  selectedStore = new StoreInfoRequest();

  assignstore = new StoreInfoRequest();
  assignstores: StoreInfoRequest[];

  kiosk = new KioskInfoRequest();
  kiosks : KioskInfoRequest[];

  billValidator = new BillValidatorInfoRequest();
  billValidators : BillValidatorInfoRequest[];

  lock = new LocksInfoRequest();
  locks : LocksInfoRequest[];
  

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
    private changeDetectorRefs: ChangeDetectorRef) { }
    
    getAllAssignedStoresList(){
      return this.http.get<StoreInfoRequest[]>(environment.smartSafeAPIUrl + '/storeinfo/kiosknames').subscribe((data) => {
         console.log("alll assigned stores list"+data);
         this.assignstores=data;
      });
    }

    getUnAssignedStoreList() {
      return this.http.get<StoreInfoRequest[]>(environment.smartSafeAPIUrl + '/storeinfo/all/unassignedKBPL');
    }
    getAllUnassignedStoresList() {
      return this.getUnAssignedStoreList().
        subscribe((data) => {
          console.log(data);
          this.stores = data;
          this.changeDetectorRefs.markForCheck();
        });
    }
  
    getStoresByStoreName(storeName: string) {
      return this.http.get<StoreInfoRequest>(environment.smartSafeAPIUrl + '/storeinfo/' + storeName);
    }
  
    onStoreSelected(storeName: string) {
      this.getStoresByStoreName(storeName).
        subscribe((data) => {
          this.selectedStore = data;
  
        })
    }
    getUnassignedkiosk() {
      return this.http.get<KioskInfoRequest[]>(environment.smartSafeAPIUrl + '/kiosk/unassignedKiosks');
    }
  
    getkioskSelected() {
      return this.getUnassignedkiosk().
      subscribe((data) => {
        console.log(data);
        this.kiosks = data;
        this.changeDetectorRefs.markForCheck();
      });
    }
  
    getUnassignedBill() {
      return this.http.get<BillValidatorInfoRequest[]>(environment.smartSafeAPIUrl + '/billValidator/unassignedBillValidators');
    }
  
    getbillValidatorSelected() {
      return this.getUnassignedBill().
      subscribe((data) => {
        console.log(data);
        this.billValidators = data;
        this.changeDetectorRefs.markForCheck();
      });
    }
    
    getUnassignedprinter() {
      return this.http.get<PrinterInfoRequest[]>(environment.smartSafeAPIUrl + '/printer/unassignedPrinters');
    }
  
    getprinterSelected() {
      return this.getUnassignedprinter().
      subscribe((data) => {
        console.log(data);
        this.printers = data;
        this.changeDetectorRefs.markForCheck();
      });
    }
  
  
    getUnassignedlocks() {
      return this.http.get<LocksInfoRequest[]>(environment.smartSafeAPIUrl + '/locks/unassignedlocks');
    }
  
    getlockSelected() {

      
      return this.getUnassignedlocks().
      subscribe((data) => {
        console.log(data);
        this.locks = data;
        this.changeDetectorRefs.markForCheck();
      });
    }

    assignStoreKBPL(storeId: number, kId:number, bId:number, pId: number, lId: number) {
      return this.http.post(environment.smartSafeAPIUrl + '/storeinfo/assign/store/' + storeId + "/kiosk/" + kId + "/billValidator/" + bId + "/printer/" + pId + "/locks/" + lId, {});
    }
    assignStore(storeId: number, kId:number, bId:number, pId: number, lId: number) {
     
  
     
      return this.assignStoreKBPL(storeId, kId, bId, pId, lId).
        subscribe((data) => {
          console.log(data);
          this.service.addAssignSuccess();
          //this.router.navigateByUrl("assign/assignstore");
          this.addClassForm.reset();
          this.dynamicText = "Assign store created successfully.";
          this.openPopup();
          this.popupid = "raise_request";
        });
        
    }
  
    ngOnInit() {
      this.getAllUnassignedStoresList();
    
      this.getkioskSelected();
      this.getbillValidatorSelected();
      this.getprinterSelected();
     this.getlockSelected();
     this.getAllAssignedStoresList();
       
    }

    closePopup() {
      this.displayStyle = "none";
      if(this.dynamicText=="Assign store created successfully."){
        this.router.navigateByUrl('/dashboard');
      }
    }

}
