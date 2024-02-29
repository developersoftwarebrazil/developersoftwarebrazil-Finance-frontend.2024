import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NavbarModule } from "../../components/navbar/navbar.module";
import { SidebarModule } from "../../components/sidebar/sidebar.module";
import { SystemRoutingModule1 } from "./system1-routing.module";
import { SystemComponent1 } from "./system1.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  providers: [],
  declarations: [SystemComponent1],
  imports: [
    CommonModule,
    SystemRoutingModule1,
    SidebarModule,
    NavbarModule,

    ReactiveFormsModule,
    NgxPaginationModule

  ]
})
export class SystemModule1 {
  sidebarActive = false;
}
