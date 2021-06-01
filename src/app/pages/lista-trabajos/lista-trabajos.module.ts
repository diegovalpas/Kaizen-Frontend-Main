import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ListaTrabajosComponent } from './lista-trabajos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarModule } from '../nav-bars/nav-bars.module';

@NgModule({
  declarations: [
    ListaTrabajosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    FormsModule,
    NavbarModule,
    NgxPaginationModule
  ]
})
export class ListaTrabajosModule {}