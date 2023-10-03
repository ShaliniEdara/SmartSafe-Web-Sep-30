import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReportRoutingModule } from './report-routing.module';
import { CreatereportComponent } from './createreport/createreport.component';


@NgModule({
  declarations: [CreatereportComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    NgbModule,FormsModule,
    NgSelectModule
  ]
})
export class ReportModule { }
