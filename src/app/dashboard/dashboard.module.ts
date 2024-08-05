import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
// import { ViewStatusComponent } from './view-status/view-status.component';
import { NgxSpinnerModule } from 'ngx-spinner';
// import { MychartComponent } from './mychart/mychart.component';
import { ChartsReportsComponent } from './charts-reports/charts-reports.component';
// import { PieChartsComponent } from './pie-charts/pie-charts.component';
import { AllstoreInfoComponent } from './allstore-info/allstore-info.component';
import { CropInfoComponent } from './crop-info/crop-info.component';
import { DashboardInfoComponent } from './dashboard-info/dashboard-info.component';


@NgModule({
  declarations: [DashboardComponent,  ChartsReportsComponent,  AllstoreInfoComponent, CropInfoComponent, DashboardInfoComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxSpinnerModule,
    
  ]
})
export class DashboardModule { }

