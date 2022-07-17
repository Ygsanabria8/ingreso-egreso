import { Routes } from "@angular/router";
import { DetailComponent } from "../entry-egress/detail/detail.component";
import { EntryEgressComponent } from "../entry-egress/entry-egress.component";
import { StatisticsComponent } from "../entry-egress/statistics/statistics.component";


export const dashboardRoutes: Routes = [
    {path: '', component: StatisticsComponent},
    {path: 'ingreso-egreso', component: EntryEgressComponent},
    {path: 'detalle', component: DetailComponent},
];