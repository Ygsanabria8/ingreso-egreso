import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UtilsService } from 'src/app/core/services/Utils/utills.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router,
    private _utils: UtilsService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void{
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  login(): void{
    if (this.loginForm.invalid) { return; }

    this._utils.showLoading();
    
    this._auth.login(this.Email.value, this.Password.value)
      .then((response:any) => {
        Swal.close();
        this._router.navigate(['/']);
      })
      .catch((error:any) => {
        console.error(error);
        this._utils.showError(error.message);
      });
  }

  get Email(): AbstractControl{
    return this.loginForm.get('email')!;
  }

  get Password(): AbstractControl{
    return this.loginForm.get('password')!;
  }

}
