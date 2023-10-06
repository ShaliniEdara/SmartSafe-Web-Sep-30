import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatecropmasterComponent } from './createcropmaster/createcropmaster.component';
import { UpdatecropmasterComponent } from './updatecropmaster/updatecropmaster.component';

const routes: Routes = [

  {
    path: 'createcrop',
    component: CreatecropmasterComponent,
    data: {
      title: 'Add Crop'
    },
    
  },
  {
    path: 'updatecrop',
    component: UpdatecropmasterComponent,
    data: {
      title: 'Update Crop'
    },
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CropmasterRoutingModule { }
