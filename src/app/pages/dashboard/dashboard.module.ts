import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { CommonModule } from "@angular/common";
import { DasboardRoutingModule } from "./dashboard-routing.module";
import { NavbarModule } from "../../components/navbar/navbar.module";

@NgModule({
  providers: [],
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DasboardRoutingModule,
    NavbarModule
  ]
})
export class DashboardModule{}
