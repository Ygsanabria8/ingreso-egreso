import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
}
