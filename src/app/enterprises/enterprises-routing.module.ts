import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterprisesPage } from './enterprises.page';

const routes: Routes = [
  {
    path: '',
    component: EnterprisesPage
  },
  {
    path: 'enterprise',
    loadChildren: () => import('./enterprise/enterprise.module').then( m => m.EnterprisePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterprisesPageRoutingModule {}
