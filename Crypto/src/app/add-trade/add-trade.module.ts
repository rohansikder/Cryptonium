import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTradePageRoutingModule } from './add-trade-routing.module';

import { AddTradePage } from './add-trade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTradePageRoutingModule
  ],
  declarations: [AddTradePage]
})
export class AddTradePageModule {}
