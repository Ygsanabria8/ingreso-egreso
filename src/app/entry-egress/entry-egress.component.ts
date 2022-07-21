import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.reduce';
import { EntryEgrees } from '../core/models/entry-egress.model';
import { EntryEgressService } from '../core/services/entry-egress/entry-egress.service';
import * as ui from '../core/store/actions/ui.actions';

@Component({
  selector: 'app-entry-egress',
  templateUrl: './entry-egress.component.html',
  styleUrls: ['./entry-egress.component.scss']
})
export class EntryEgressComponent implements OnInit, OnDestroy {

  stateSubscription!: Subscription;
  loading = false;
  entryForm!: FormGroup;
  type = 'entry';

  constructor(
    private _fb: FormBuilder,
    private _entryEgressService: EntryEgressService,
    private _store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.setStateSubscription();
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

  setStateSubscription(): void {
    this.stateSubscription = this._store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
    });
  }

  buildForm(): void {
    this.entryForm = this._fb.group({
      description: this._fb.control('', Validators.required),
      amount: this._fb.control(0, Validators.required),
    });
  }

  save(): void{
    this._store.dispatch(ui.isLoading());
    if (this.entryForm.invalid) {return;}

    const entryEgrees:EntryEgrees = {
      ...this.entryForm.value,
      type: this.type,
    };
    this._entryEgressService.createEntryEgress(entryEgrees)
      .then(() => {
        Swal.fire('Registro creado', entryEgrees.description, 'success');
        this.entryForm.reset();
        this._store.dispatch(ui.stopLoading());
      })
      .catch((error: any) => {
        Swal.fire('Error', error.message, 'error');
        console.error(error);
        this._store.dispatch(ui.stopLoading());
      });
  }

}
