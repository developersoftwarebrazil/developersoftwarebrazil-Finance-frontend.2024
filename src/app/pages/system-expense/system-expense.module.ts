import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarModule } from "../../components/navbar/navbar.module";
import { SidebarModule } from "../../components/sidebar/sidebar.module";
import { SystemExpenseComponent } from "./system-expense.component";
import { SystemExpenseRoutingModule } from "./system-expense-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectComponent, NgSelectModule } from "@ng-select/ng-select";
import { SlideToggleModule } from "../../components/slide-toggle/slide-toggle.module";

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
    NgSelectModule,
    SlideToggleModule

  ]
})
export class SystemExpenseModule {

}
