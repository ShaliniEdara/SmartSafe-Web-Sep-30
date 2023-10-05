import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CropmasterRoutingModule } from './cropmaster-routing.module';
import { CreatecropmasterComponent } from './createcropmaster/createcropmaster.component';

@NgModule({
  declarations: [CreatecropmasterComponent],
  imports: [
    CommonModule,
    CropmasterRoutingModule,
    NgbModule,FormsModule,
    NgSelectModule
  ]
})
export class CropmasterModule { }
