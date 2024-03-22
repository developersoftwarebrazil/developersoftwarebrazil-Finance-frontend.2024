import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from '../../components/sidebar/sidebar.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { ExpenseComponent } from './expense.component';
import { ExpenseRoutingModule } from './expense-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [ExpenseComponent],
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    SidebarModule,
    NavbarModule,

    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatSlideToggleModule
  ]
})
export class ExpenseModule { }
