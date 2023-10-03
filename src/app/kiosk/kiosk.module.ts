import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KioskRoutingModule } from './kiosk-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BillValidatorComponent } from './bill-validator/bill-validator.component';
import { PrinterComponent } from './printer/printer.component';
import { LocksComponent } from './locks/locks.component';
import { KioskComponent } from './kiosks/kiosk.component';
import { UpdateLocksComponent } from './locks/update-locks/update-locks.component';
import { UpdateBillValidatorComponent } from './bill-validator/update-bill-validator/update-bill-validator.component';
import { UpdatePrinterComponent } from './printer/update-printer/update-printer.component';
import { UpdateKioskComponent } from './kiosks/update-kiosk/update-kiosk.component';


@NgModule({

  declarations: [BillValidatorComponent, PrinterComponent, LocksComponent, KioskComponent,UpdateLocksComponent,UpdateBillValidatorComponent, UpdatePrinterComponent, UpdateKioskComponent ],

  imports: [
    CommonModule,
    KioskRoutingModule,
    NgbModule,
    FormsModule,
    NgSelectModule
  ]
})
export class KioskModule { }
