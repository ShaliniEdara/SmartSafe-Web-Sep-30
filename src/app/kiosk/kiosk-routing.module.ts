import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillValidatorComponent } from './bill-validator/bill-validator.component';
import { UpdateBillValidatorComponent } from './bill-validator/update-bill-validator/update-bill-validator.component';

import { KioskComponent } from './kiosks/kiosk.component';
import { UpdateKioskComponent } from './kiosks/update-kiosk/update-kiosk.component';

import { LocksComponent } from './locks/locks.component';

import { UpdateLocksComponent } from './locks/update-locks/update-locks.component';


import { PrinterComponent } from './printer/printer.component';
import { UpdatePrinterComponent } from './printer/update-printer/update-printer.component';

const routes: Routes = [
  {
    path: 'newkiosk',
     component: KioskComponent,
    data: {
      title: 'Kiosk Management'
    },
    
  },

  {
    path: 'bill-validator',
     component: BillValidatorComponent,
    data: {
      title: 'Bill Validator'
    },
    
  },

  {
    path: 'printer',
     component: PrinterComponent,
    data: {
      title: 'Printer'
    },
    
  },

  {
    path: 'locks',
     component: LocksComponent,
    data: {
      title: 'Locks'
    },
    
  },

  {
    path: 'update-kiosk',
     component: UpdateKioskComponent,
    data: {
      title: 'update-Kiosk'
    },
    
  },

  {
    path: 'update-billValidator',
     component: UpdateBillValidatorComponent,
    data: {
      title: 'update-billValidator'
    },
    
  },

  {
    path: 'update-printer',
     component: UpdatePrinterComponent,
    data: {
      title: 'update-Printer'
    },
    
  },

  {
    path: 'update-lock',
     component: UpdateLocksComponent,
    data: {
      title: 'update-lock'
    },
    
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KioskRoutingModule { }
