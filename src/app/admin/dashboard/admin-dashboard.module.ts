import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";

export const AdminDashboardRoutes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    data: {
      breadcrumb: 'Dashboard Admin',
      icon: 'icofont-home bg-c-blue',
      status: false
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminDashboardRoutes),
    SharedModule
  ],
  declarations: [AdminDashboardComponent]
})
export class AdminDashboardModule { }
