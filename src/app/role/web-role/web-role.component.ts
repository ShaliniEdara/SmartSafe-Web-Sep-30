import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'app/model/role';

import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';

interface TodoItemNode {
  item: string;
  children?: TodoItemNode[];
  expanded?: boolean;
}

const TREE_DATA: TodoItemNode[] = [
   {
    item: 'Dashboard'
  },
  {
    item: 'Role Management',
    children: [
      {
        item: 'Create Role'
      },
      { item: 'Web Role'
      },
      { item: 'Kiosk Role'
      }
    ]
  },
  {
    item: 'Corp Master'
  },
  {
    item: 'Store Management'
  },
  {
    item: 'User Management'
  },
  {
    item: 'Kiosk Management',
    children: [
      {
        item: 'Add Kiosk'
      },
      { 
        item: 'Add Bill Validator'
      },
      { 
        item: 'Add Printer'
      },
      {
        item: 'Add Locks'
      }
    ]
  },
  {
    item: 'Assign To Store',
    children: [
      {
        item: 'Assign Store'
      },
      { 
        item: 'Assign User To Store'
      },
      { 
        item: 'Assign Permission'
      }
    ]
  },
  {
    item: 'Reports'
  },
  {
    item: 'Settings'
  }
];

@Component({
  selector: 'app-web-role',
  templateUrl: './web-role.component.html',
  styleUrls: ['./web-role.component.scss']
})
export class WebRoleComponent implements OnInit {

  @ViewChild("addClassForm", null) addClassForm: NgForm;

  constructor(private http: HttpClient,
    private router: Router,
    private service: NGXToastrService,
    private changeDetectorRefs: ChangeDetectorRef) {
  }

  role = new Role();
  selectedRole: any = null;
  roles = [
    { name: 'Admin' },
    { name: 'Manager' },
    { name: 'Owner' },
    { name: 'Direction of Operation' },
    { name: 'Super Admin'}
  ];
  dataSource = TREE_DATA;
  checklistSelection: Set<string> = new Set<string>();
  

  ngOnInit(): void {
    
  }

  isExpandable(node: TodoItemNode): boolean {
    return !!node.children && node.children.length > 0;
  }

  todoItemSelectionToggle(node: TodoItemNode): void {
    if (this.checklistSelection.has(node.item)) {
      this.checklistSelection.delete(node.item);
      this.deselectChildren(node);
    } else {
      this.checklistSelection.add(node.item);
      this.selectChildren(node);
    }
  }

  selectChildren(node: TodoItemNode): void {
    if (node.children) {
      node.children.forEach(child => {
        this.checklistSelection.add(child.item);
        this.selectChildren(child);
      });
    }
  }

  deselectChildren(node: TodoItemNode): void {
    if (node.children) {
      node.children.forEach(child => {
        this.checklistSelection.delete(child.item);
        this.deselectChildren(child);
      });
    }
  }

  isSelected(node: TodoItemNode): boolean {
    return this.checklistSelection.has(node.item);
  }

  toggleExpand(node: TodoItemNode): void {
    node.expanded = !node.expanded;
  }

  flattenedDataSource(): TodoItemNode[] {
    const result: TodoItemNode[] = [];

    const traverse = (nodes: TodoItemNode[]) => {
      nodes.forEach(node => {
        result.push(node);
        if (node.children) {
          traverse(node.children);
        }
      });
    };

    traverse(this.dataSource);
    return result;
  }

  isPermissionAssigned(role: any, permission: TodoItemNode): boolean {
    // Implement logic to check if the permission is assigned to the role
    // Here you would typically check if the role has the specific permission
    // This is a placeholder, replace it with your actual implementation
    return this.checklistSelection.has(permission.item) && this.selectedRole === role;
  }
  
  assignPermissions(): void {
    // Implement your logic to assign the permissions
    // This method will be called when the "Assign Permissions" button is clicked
  }
}