import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxPaginationModule } from "ngx-pagination";
import { NavbarModule } from "../../components/navbar/navbar.module";
import { SidebarModule } from "../../components/sidebar/sidebar.module";
import { SystemExpenseRoutingModule } from "./system-expense-routing.module";
import { SystemExpenseComponent } from "./system-expense.component";

@NgModule({
  providers: [],
  declarations: [SystemExpenseComponent],
  imports: [
    CommonModule,
    SystemExpenseRoutingModule,
    SidebarModule,
    NavbarModule,

    FormsModule,
    ReactiveFormsModule,


    NgxPaginationModule,
    NgSelectModule,
    MatIconModule,
    NgxPaginationModule,

  ]
})
export class SystemExpenseModule {

}
