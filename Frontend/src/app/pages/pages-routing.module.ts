import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CheckIpComponent } from './landing-page/check-ip/check-ip.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      redirectTo: 'dashboard'
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'scan',
      component: LandingPageComponent,
      // redirectTo: 'dashboard',
      // pathMatch: 'full',
    },
    {
      path: 'checkip/:ip_to_check',
      component: CheckIpComponent,
    },
    // {
		// 	path: 'expenses-management', loadChildren: () => import('../pages/expenses/expenses.module')
		// 		.then(m => m.ExpensesModule),
		// },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
