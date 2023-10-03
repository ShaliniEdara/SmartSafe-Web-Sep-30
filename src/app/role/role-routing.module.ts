import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateroleComponent } from './createrole/createrole.component';
import { UpdateRoleComponent } from './update-role/update-role.component';

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
    
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
