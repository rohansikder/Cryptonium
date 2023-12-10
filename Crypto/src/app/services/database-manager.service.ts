import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseManagerService {
  http: any;
  getTradesForCurrentUser(): Observable<any[]> {
    return this.auth.user.pipe(
      switchMap(user => {
        if (user) {
          const userEmail = user.email || '';
          return this.getTradesByUserEmail(userEmail);
        } else {
          console.error('No authenticated user found.');
          return [];
        }
      })
    );
  }
  
  private getTradesByUserEmail(userEmail: string): Observable<any[]> {
    return this.firestore.collection('trades', ref =>
      ref.where('ownerEmail', '==', userEmail)
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        // Ensure data is an object before spreading
        return { id, ...(typeof data === 'object' && data ? data : {}) };
      }))
    );
  }
  
  

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth 
  ) { }

  async saveData(buyPrice: number, symbol: string, takeProfit: number, stopLoss: number, notes: string) {
    try {
      const user = await this.auth.currentUser; 
      if (user) {
        const userEmail = user.email; 
        const data = {
          buyPrice,
          symbol,
          takeProfit,
          stopLoss,
          notes,
          ownerEmail: userEmail 
        };
        await this.firestore.collection('trades').add(data);
        console.log('Data saved successfully');
      } else {
        console.error('No authenticated user found.');
      }
    } catch (error) {
      console.error('Error saving data: ', error);
    }
  }
  
  deleteTrade(tradeId: string) {
    return this.firestore.collection('trades').doc(tradeId).delete()
      .then(() => console.log('Trade successfully deleted'))
      .catch((error) => console.error('Error deleting trade: ', error));
  }
  
}
