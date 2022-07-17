import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _auth: AngularFireAuth
  ) { }

  createUser(user: User): any {
    return this._auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  login(email:string, password: string): any{
    return this._auth.signInWithEmailAndPassword(email, password);
  }

  logout(): any {
    return this._auth.signOut();
  }
}
