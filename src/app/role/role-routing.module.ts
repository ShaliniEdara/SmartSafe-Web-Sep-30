import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateroleComponent } from './createrole/createrole.component';
import { UpdateRoleComponent } from './update-role/update-role.component';
import { WebRoleComponent } from './web-role/web-role.component';
import { KioskRoleComponent } from './kiosk-role/kiosk-role.component';

const routes: Routes = [
  {
    path: 'createrole',
     component: CreateroleComponent,
    data: {
      title: 'Add Role'
    },
    
  },



  {
    path: 'updaterole',
     component: UpdateRoleComponent,
    data: {
      title: 'update Role'
    },
    
  },

  {
    path: 'webrole',
     component: WebRoleComponent,
    data: {
      title: 'web Role'
    },
    
  },

  {
    path: 'kioskrole',
     component: KioskRoleComponent,
    data: {
      title: 'kiosk Role'
    },
    
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
