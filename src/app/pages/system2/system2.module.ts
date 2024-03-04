import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SystemRoutingModule2 } from "./system2-routing.module";
import { NavbarModule } from "../../components/navbar/navbar.module";
import { SidebarModule } from "../../components/sidebar/sidebar.module";
import { SystemComponent2 } from "./system2.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  providers: [],
  declarations: [SystemComponent2],
  imports: [
    CommonModule,
    SystemRoutingModule2,
    SidebarModule,
    NavbarModule,

    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,

  ]
})
export class SystemModule2 {
  sidebarActive = false;
}
