import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NavbarModule } from "../../components/navbar/navbar.module";
import { SidebarModule } from "../../components/sidebar/sidebar.module";
import { ExpenseComponent } from "./expense.component";
import { ExpenseRoutingModule } from "./expense-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  providers: [],
  declarations: [ExpenseComponent],
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    SidebarModule,
    NavbarModule,

    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,

  ]
})
export class ExpenseModule {
  sidebarActive = false;
}
