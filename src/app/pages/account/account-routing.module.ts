import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountPage } from './account.page';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AutoLoginGuard } from 'src/app/guards/auto-login.guard';



const routes: Routes = [
  {
    path: '',
    component: AccountPage,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
        
      },
      {
        path: 'login',
        component: LoginComponent,
        canLoad: [AutoLoginGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPageRoutingModule {}
