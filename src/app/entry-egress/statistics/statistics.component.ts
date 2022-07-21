import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/internal/Subscription';
import { AppState } from 'src/app/app.reduce';
import { EntryEgrees } from 'src/app/core/models/entry-egress.model';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  entries = 0;
  egress = 0;
  totalEntries = 0;
  totalEgress = 0;
  stateSubscription!: Subscription;
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ [ 'Egresos'], [ 'Egresos' ]],
    datasets: [ {
      data: [ 0, 0 ]
    } ]
  };

  constructor(
    private _store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.setStateSubscriptions();
  }

  setStateSubscriptions(): void{
    this.stateSubscription = this._store.select('items')
      .subscribe(items => this.makeStatistics(items.items.map(item => ({
        ...item,
        type: item.type === 'entry' ? 'ingreso' : 'egreso'
      }))));
  }

  makeStatistics(items: EntryEgrees[]): void {
    this.resetData();
    items.forEach(item => {
      if(item.type === 'ingreso'){
        this.totalEntries += item.amount;
        this.entries ++;
      } else {
        this.totalEgress += item.amount;
        this.egress ++;
      }
    });
    this.pieChartData.datasets[0].data = [this.totalEgress, this.totalEntries];
  }
  
  resetData(): void {
    this.egress = 0;
    this.entries = 0;
    this.totalEgress = 0;
    this.totalEntries = 0;
  }

}
