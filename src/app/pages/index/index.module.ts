import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { AppRoutingModule } from '../../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RecentPuestosTrabajoComponent } from './recent-puestos-trabajo/recent-puestos-trabajo.component';
import { PartPuestosTrabajoComponent } from './part-puestos-trabajo/part-puestos-trabajo.component';
import { FullPuestosTrabajoComponent } from './full-puestos-trabajo/full-puestos-trabajo.component';
import { RouterModule} from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarModule } from '../nav-bars/nav-bars.module';

@NgModule({
  declarations: [
    IndexComponent,
    RecentPuestosTrabajoComponent,
    PartPuestosTrabajoComponent,
    FullPuestosTrabajoComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NavbarModule,
    RouterModule,
    NgxPaginationModule
  ]
})
export class IndexModule { }
