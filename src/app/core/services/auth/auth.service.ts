import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { User, UserAuth } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _auth: AngularFireAuth,
    private _firestore: AngularFirestore,
  ) { }

  initAuthListener(): any {
    this._auth.authState.subscribe((user) =>{
      
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
