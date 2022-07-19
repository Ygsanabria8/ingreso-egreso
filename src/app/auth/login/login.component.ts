import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reduce';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UtilsService } from 'src/app/core/services/Utils/utills.service';
import * as ui from 'src/app/core/store/actions/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  stateSubscription!: Subscription;
  isLoading = false;

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    private _utils: UtilsService,
    private _store: Store<AppState>,
  ) { }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.buildForm();
    this.setStateSubscription();
  }

  buildForm(): void{
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  login(): void{
    if (this.loginForm.invalid) { return; }
    this._store.dispatch( ui.isLoading() );
    
    this._auth.login(this.Email.value, this.Password.value)
      .then((response:any) => {
        this._store.dispatch( ui.stopLoading() );
        this._router.navigate(['/']);
      })
      .catch((error:any) => {
        console.error(error);
        this._store.dispatch( ui.stopLoading() );
        this._utils.showError(error.message);
      });
  }

  setStateSubscription(): void {
    this.stateSubscription = this._store.select('ui')
      .subscribe( ui => this.isLoading = ui.isLoading);
  }

  get Email(): AbstractControl{
    return this.loginForm.get('email')!;
  }

  get Password(): AbstractControl{
    return this.loginForm.get('password')!;
  }

}
