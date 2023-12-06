import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseManagerService {

  constructor(private firestore: AngularFirestore) { }

  async saveData(buyPrice: number, symbol: string, takeProfit: number, stopLoss: number, notes: string) {
    const data = { buyPrice, symbol, takeProfit, stopLoss, notes };
    try {
      await this.firestore.collection('trades').add(data);
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data: ', error);
    }
  }
}
