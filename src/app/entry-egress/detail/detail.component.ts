import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reduce';
import { EntryEgrees } from 'src/app/core/models/entry-egress.model';
import { EntryEgressService } from 'src/app/core/services/entry-egress/entry-egress.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  stateSubscription!: Subscription;
  items!: EntryEgrees[];

  constructor(
    private _store: Store<AppState>,
    private _entryEgressServie: EntryEgressService,
  ) { }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.setStateSubscriptions();
  }

  setStateSubscriptions(): void{
    this.stateSubscription = this._store.select('items')
      .subscribe(items => this.items = items.items.map(item => ({
        ...item,
        type: item.type === 'entry' ? 'ingreso' : 'egreso'
      })));
  }

  delete(itemId: string | undefined): void {
    this._entryEgressServie.deleteEntryEgress(itemId as string)
      .then(() => Swal.fire('Borrado', 'Item borrado', 'success'))
      .catch((error:any) => Swal.fire('Borrado', error.message, 'error'));
  }

}
