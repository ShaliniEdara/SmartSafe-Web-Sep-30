import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatecropmasterComponent } from './createcropmaster/createcropmaster.component';

const routes: Routes = [

  {
    path: 'createcrop',
    component: CreatecropmasterComponent,
    data: {
      title: 'Add Crop'
    },
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CropmasterRoutingModule { }
