import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import { LoginComponent } from './login.component';
import {SharedModule} from "../../shared/shared.module";

export const LoginRoutes: Routes = [
    {
      path: '',
      component: LoginComponent,
      data: {
        breadcrumb: 'Login ',
        icon: 'icofont-home bg-c-blue',
        status: false
      }
    }
  ];


@NgModule({
    imports: [
      CommonModule,
      SharedModule,
      RouterModule.forChild(LoginRoutes)
    ],
    declarations: [LoginComponent],
    // providers: [AppService]
  })




export class LoginModule {}
