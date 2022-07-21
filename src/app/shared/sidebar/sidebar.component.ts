import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reduce';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UtilsService } from 'src/app/core/services/Utils/utills.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  storeSubscription!: Subscription;
  userName = '';

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _utils: UtilsService,
    private _store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.setStoreSubcription();
  }

  logOut(): void{
    this._utils.showLoading()
    this._auth.logout()
    .then((response: void) =>{
      Swal.close();
      this._router.navigate(['/login']);
    })
    .catch((error: any) => {
      console.error(error);
      this._utils.showError(error.message);
    })
  }

  setStoreSubcription(): void {
    this.storeSubscription = this._store.select('auth')
      .pipe(
        filter(auth => auth.user !== null)
      )
      .subscribe(auth => {
        this.userName = auth.user!.name as string;
      });
  }

}
