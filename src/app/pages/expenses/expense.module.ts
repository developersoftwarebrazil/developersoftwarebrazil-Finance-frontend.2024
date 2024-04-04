import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from '../../components/sidebar/sidebar.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { ExpenseComponent } from './expense.component';
import { ExpenseRoutingModule } from './expense-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SlideToggleComponent } from '../../components/slide-toggle/slide-toggle.component';
import { SlideToggleModule } from '../../components/slide-toggle/slide-toggle.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ExpenseComponent,
    SlideToggleComponent
  ],
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    SidebarModule,
    NavbarModule,
    SlideToggleModule,

    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxPaginationModule

  ]
})
export class ExpenseModule { }
