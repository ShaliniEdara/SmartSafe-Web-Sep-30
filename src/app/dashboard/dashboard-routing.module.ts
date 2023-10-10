import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { ChartsReportsComponent } from './charts-reports/charts-reports.component';
import { DashboardComponent } from './dashboard.component';
import { AllstoreInfoComponent } from './allstore-info/allstore-info.component';
import { CropInfoComponent } from './crop-info/crop-info.component';

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
  

  // {
  //   path: 'view-status',
  //    component: ViewStatusComponent,
  //   data: {
  //     title: 'view-status'
  //   },
    
  // },
  // {
  //   path: 'charts',
  //    component: MychartComponent,
  //   data: {
  //     title: 'mychart'
  //   },
    
  // },
  {
    path: 'charts-reports',
     component: ChartsReportsComponent,
    data: {
      title: 'mychart-reports'
    },
    
  },
  
  {
    path: 'allstoreinfo',
     component: AllstoreInfoComponent,
    data: {
      title: 'allstoreinfo'
    },
    
  },
  {
    path: 'corpInfo',
     component: CropInfoComponent,
    data: {
      title: 'corpInfo'
    },
    
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
