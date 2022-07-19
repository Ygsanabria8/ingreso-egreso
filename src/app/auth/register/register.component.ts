import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reduce';
import { UserAuth } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UtilsService } from 'src/app/core/services/Utils/utills.service';
import * as ui from 'src/app/core/store/actions/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  userForm!: FormGroup;
  stateSubscription!: Subscription;
  isLoading = false;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _utils: UtilsService,
    private _store: Store<AppState>,
  ) { 
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.setStateSubscription();
  }

  buildForm(): void{
    this.userForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  createUser(): void{
    if (this.userForm.invalid) { return; }
    this._store.dispatch( ui.isLoading() );
    const user: UserAuth = {
      ...this.userForm.value
    };
    this._authService.createUser(user)
      .then((credentials: any) => {
        this._store.dispatch( ui.stopLoading() )
        this._router.navigate(['/']);
      })
      .catch((error: any) => {
        console.error(error);
        this._store.dispatch( ui.stopLoading() )
        this._utils.showError(error.message);
      });
  }

  setStateSubscription(): void {
    this.stateSubscription = this._store.select('ui')
      .subscribe( ui => this.isLoading = ui.isLoading);
  }

  get Name(): AbstractControl{
    return this.userForm.get('name')!;
  }

  get Email(): AbstractControl{
    return this.userForm.get('email')!;
  }

  get Password(): AbstractControl{
    return this.userForm.get('password')!;
  }

}
