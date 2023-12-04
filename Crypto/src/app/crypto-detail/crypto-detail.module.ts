import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CryptoDetailPageRoutingModule } from './crypto-detail-routing.module';

import { CryptoDetailPage } from './crypto-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CryptoDetailPageRoutingModule
  ],
  declarations: [CryptoDetailPage]
})
export class CryptoDetailPageModule {}
