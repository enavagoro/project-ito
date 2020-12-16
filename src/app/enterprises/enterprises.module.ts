import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterprisesPageRoutingModule } from './enterprises-routing.module';

import { EnterprisesPage } from './enterprises.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnterprisesPageRoutingModule
  ],
  declarations: [EnterprisesPage]
})
export class EnterprisesPageModule {}
