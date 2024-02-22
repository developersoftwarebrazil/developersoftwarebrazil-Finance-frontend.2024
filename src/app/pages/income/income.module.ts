import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NavbarModule } from "../../components/navbar/navbar.module";
import { SidebarModule } from "../../components/sidebar/sidebar.module";
import { IncomeComponent } from "./income.component";
import { IncomeRoutingModule } from "./income-routing.module";

@NgModule({
  providers: [],
  declarations: [IncomeComponent],
  imports: [
    CommonModule,
    IncomeRoutingModule,
    SidebarModule,
    NavbarModule,

  ]
})
export class IncomeModule {
  sidebarActive = false;
}