import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterprisePageRoutingModule } from './enterprise-routing.module';

import { EnterprisePage } from './enterprise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnterprisePageRoutingModule
  ],
  declarations: [EnterprisePage]
})
export class EnterprisePageModule {}
