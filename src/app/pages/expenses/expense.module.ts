import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { SidebarModule } from '../../components/sidebar/sidebar.module';
import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpenseComponent } from './expense.component';


@NgModule({
  declarations: [
    ExpenseComponent,

  ],
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    SidebarModule,
    NavbarModule,

    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxPaginationModule,
    MatSlideToggleModule,

    MatIconModule

  ]
})
export class ExpenseModule { }
