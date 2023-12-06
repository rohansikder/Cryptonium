import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTradePage } from './add-trade.page';

const routes: Routes = [
  {
    path: '',
    component: AddTradePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTradePageRoutingModule {}
