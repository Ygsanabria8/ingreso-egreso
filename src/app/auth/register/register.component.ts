import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UtilsService } from 'src/app/core/services/Utils/utills.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _utils: UtilsService,
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
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
    this._utils.showLoading();
    const user: User = {
      ...this.userForm.value
    };
    this._authService.createUser(user)
      .then((credentials: any) => {
        Swal.close();
        this._router.navigate(['/']);
      })
      .catch((error: any) => {
        console.error(error);
        this._utils.showError(error.message);
      });
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
