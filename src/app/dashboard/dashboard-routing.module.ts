import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { ChartsReportsComponent } from './charts-reports/charts-reports.component';
import { DashboardComponent } from './dashboard.component';
import { MychartComponent } from './mychart/mychart.component';
import { PieChartsComponent } from './pie-charts/pie-charts.component';
import { ViewStatusComponent } from './view-status/view-status.component';
import { AllstoreInfoComponent } from './allstore-info/allstore-info.component';

const routes: Routes = [
  {
    path: '',
     component: DashboardComponent,
    data: {
      title: 'Dashboard'
    },
    canActivate: [AuthGuard],
    
  },
  {
    path: 'dashboard',
     component: DashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },
  

  {
    path: 'view-status',
     component: ViewStatusComponent,
    data: {
      title: 'view-status'
    },
    
  },
  {
    path: 'charts',
     component: MychartComponent,
    data: {
      title: 'mychart'
    },
    
  },
  {
    path: 'charts-reports',
     component: ChartsReportsComponent,
    data: {
      title: 'mychart-reports'
    },
    
  },
  {
    path: 'pie-charts',
     component: PieChartsComponent,
    data: {
      title: 'pie-chart'
    },
    
  },
  {
    path: 'allstoreinfo',
     component: AllstoreInfoComponent,
    data: {
      title: 'allstoreinfo'
    },
    
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
