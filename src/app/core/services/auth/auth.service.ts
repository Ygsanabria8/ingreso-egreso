import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/app.reduce';
import { User, UserAuth } from '../../models/user.model';
import * as auth from '../../store/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription!: Subscription;
  private user!: User | undefined;

  get User(): User | undefined {
    return this.user;
  }

  constructor(
    private _auth: AngularFireAuth,
    private _firestore: AngularFirestore,
    private _store: Store<AppState>
  ) { }

  initAuthListener(): any {
    this._auth.authState.subscribe((user) =>{
      if (user){
        this.userSubscription = this._firestore.doc(`${user.uid}/user`).valueChanges()
          .subscribe( (firestoreUser: any) => {
            const tempUser: User = {
              uid: firestoreUser.uid,
              email: firestoreUser.email,
              name: firestoreUser.name
            };
            this.user = tempUser;
            this._store.dispatch(auth.setUser({user: tempUser}));
          });
      } else {
        this.user = undefined;
        this.userSubscription.unsubscribe();
        this._store.dispatch(auth.unsetUser());
      }
    });
  }

  createUser(user: UserAuth): any {
    return this._auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userFirebase => {
        const newUser: User = {
          uid: userFirebase.user?.uid,
          name: user.name,
          email: user.email,
        };
        return this._firestore.doc(`${newUser.uid}/user`)
          .set(newUser);
      });
  }

  login(email:string, password: string): any{
    return this._auth.signInWithEmailAndPassword(email, password);
  }

  logout(): any {
    return this._auth.signOut();
  }

  isAuth(): any{
    return this._auth.authState.pipe(
      map( firebaseUser => firebaseUser !== null )
    );
  }
}
