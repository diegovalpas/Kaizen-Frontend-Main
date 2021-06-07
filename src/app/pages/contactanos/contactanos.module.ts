import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactanosComponent} from './contactanos.component'
import { NavFooterModule } from '../nav-footer/nav-footer.module';



@NgModule({
  declarations: [
    ContactanosComponent
  ],
  imports: [
    CommonModule,
    NavFooterModule
  ]
})
export class ContactanosModule { }
