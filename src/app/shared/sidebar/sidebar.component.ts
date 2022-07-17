import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UtilsService } from 'src/app/core/services/Utils/utills.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _utils: UtilsService,
  ) { }

  ngOnInit(): void {
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

}
