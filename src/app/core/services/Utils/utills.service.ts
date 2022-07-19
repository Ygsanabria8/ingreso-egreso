import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  showError(message: string): void{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  showLoading(): void {
    Swal.fire({
      title: 'Espera por favor',
      didOpen: () => {
        Swal.showLoading()
      }
    })
  }
}
