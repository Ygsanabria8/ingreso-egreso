import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';


import { DetailComponent } from './detail/detail.component';
import { EntryEgressComponent } from './entry-egress.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { OrderItemsPipe } from '../core/pipes/orderItems/order-items.pipe';
import { EntryEgressRoutingModule } from './entry-egress-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import { entryEgressReducer } from '../core/store/reducers/entry-egress.reducers';



@NgModule({
  declarations: [
    DashboardComponent,
    EntryEgressComponent,
    DetailComponent,
    StatisticsComponent,
    OrderItemsPipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('items',entryEgressReducer),
    EntryEgressRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
  ]
})
export class EntryEgressModule { }
