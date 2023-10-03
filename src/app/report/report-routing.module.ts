import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatereportComponent } from './createreport/createreport.component';


const routes: Routes = [
  {
    path: 'createreport',
     component: CreatereportComponent,
    data: {
      title: 'Reports'
    },
    
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
