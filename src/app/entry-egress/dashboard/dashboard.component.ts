import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reduce';
import { EntryEgrees } from 'src/app/core/models/entry-egress.model';
import { EntryEgressService } from 'src/app/core/services/entry-egress/entry-egress.service';
import * as EntryEgressActions from '../../core/store/actions/entry-egress.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubscription!: Subscription;
  entryEgressSubscription!: Subscription;

  constructor(
    private _store: Store<AppState>,
    private _entryEgressService: EntryEgressService,
  ) { }

  ngOnInit(): void {
    this.setUserSubscription();
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.entryEgressSubscription?.unsubscribe();
  }

  setUserSubscription(): void {
    this.userSubscription = this._store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe( user => {
        this.entryEgressSubscription = this._entryEgressService.initEntryEgressListener(user.user?.uid as string)
          .subscribe((entryEgress: EntryEgrees[]) => {
            this._store.dispatch(EntryEgressActions.setItems({items: entryEgress}));
          });
      });
  }

}
