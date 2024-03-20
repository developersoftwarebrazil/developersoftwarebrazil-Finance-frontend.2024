import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarModule } from "../../components/navbar/navbar.module";
import { SidebarModule } from "../../components/sidebar/sidebar.module";
import { SystemIncomeComponent } from "./system-income.component";
import { SystemIncomeRoutingModule } from "./system-income-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectComponent, NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  providers: [],
  declarations: [SystemIncomeComponent],
  imports: [
    CommonModule,
    SystemIncomeRoutingModule,
    SidebarModule,
    NavbarModule,

    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,

  ]
})
export class SystemIncomeModule {

}
