import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ListaTrabajosComponent } from './lista-trabajos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavFooterModule } from '../nav-footer/nav-footer.module';

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
    NgxPaginationModule,
    NavFooterModule
  ]
})
export class ListaTrabajosModule { 


  
}
