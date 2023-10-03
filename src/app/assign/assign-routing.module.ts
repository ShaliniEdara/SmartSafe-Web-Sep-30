import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignPermissionComponent } from './assign-permission/assign-permission.component';
import { AssignUserToStoreComponent } from './assign-user-to-store/assign-user-to-store.component';
import { AssignstoreComponent } from './assignstore/assignstore.component';


const routes: Routes = [
  {
    path: 'assignstore',
     component: AssignstoreComponent,
    data: {
      title: 'Assign Store'
    },
  },

  {
    path: 'assign-user-to-store',
     component: AssignUserToStoreComponent,
    data: {
      title: 'Assign User To Store'
    },
  },

  {
    path: 'assign-permission',
     component: AssignPermissionComponent,
    data: {
      title: 'Assign Permissions'
    },
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignRoutingModule { }
