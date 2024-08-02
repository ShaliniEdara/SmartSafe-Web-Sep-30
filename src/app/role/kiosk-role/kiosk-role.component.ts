import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    item: 'InsetBills'
  },
  {
    item: 'Admin',
    children: [
      {
        item: 'Safe Access',
        children: [
          { item: 'Main Safe' },
          { item: 'Shift Manager Safe' },
          { item: 'Inter Safe' }
        ]
      },
      { item: 'Accounts',
        children: [
          { item: 'Employee' },
          { item: 'Manager' },
          { item: 'Shift Manager' },
          { item: 'Role Access' }
        ]
      },
      { item: 'Reports',
        children: [
          { item: 'Test Report' },
          { item: 'Manager' },
          { item: 'Shift Manager' },
          { item: 'Role Access' }
        ]
      },
      { item: 'Change Request' }
    ]
  },
  {
    item: 'Truck'
  },
  {
    item: 'StandBank',
    children: [
      { item: 'Main Safe' },
      { item: 'ShiftManager Safe' },
      { item: 'Drawer Safe' }
    ]
  },
  {
    item: 'System Maintenance',
    children: [
      { item: 'Bill Acceptor JAM' },
      { item: 'Printer Maintenance' },
      { item: 'Employee Maintenance' },
      { item: 'Configure Store' },
      { item: 'Track Manager' },
      { item: 'Configure Kiosk' }
    ]
  },
  {
    item: 'Contact Us'
  }
];

@Component({
  selector: 'app-kiosk-role',
  templateUrl: './kiosk-role.component.html',
  styleUrls: ['./kiosk-role.component.scss']
})
export class KioskRoleComponent implements OnInit {

  @ViewChild("addClassForm", null) addClassForm: NgForm;

  
  selectedRole: any = null;
  roles = [
    { name: 'Store Admin' },
    { name: 'Manager' },
    { name: 'Shift Manager' },
    { name: 'Employee' }
  ];
  dataSource = TREE_DATA;
  checklistSelection: Set<string> = new Set<string>();

  ngOnInit(): void {
    // Initialization logic here
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