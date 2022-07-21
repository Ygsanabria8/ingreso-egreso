import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { EntryEgrees } from '../../models/entry-egress.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EntryEgressService {

  constructor(
    private _fiestore: AngularFirestore,
    private _authService: AuthService,
  ) { }

  createEntryEgress(entryEgress: EntryEgrees): any {
    return this._fiestore.doc(`${this._authService.User?.uid}/entry-egress`)
      .collection('items')
      .add(entryEgress);
  }

  initEntryEgressListener(userId: string): any {
    return this._fiestore.collection(`${userId}/entry-egress/items`)
      .snapshotChanges()
      .pipe(
        map(snapshop => snapshop.map( doc => ({
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as any
        })))
      );
  }
}
