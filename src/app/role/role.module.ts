import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { CreateroleComponent } from './createrole/createrole.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
// import { UpdateUserComponent } from './update-user/update-user.component';
import { UpdateRoleComponent } from './update-role/update-role.component';
import { WebRoleComponent } from './web-role/web-role.component';
import { KioskRoleComponent } from './kiosk-role/kiosk-role.component';

@NgModule({
  declarations: [CreateroleComponent,  UpdateRoleComponent, WebRoleComponent, KioskRoleComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    NgbModule,FormsModule,
    NgSelectModule
    
  ]
})
export class RoleModule { }
