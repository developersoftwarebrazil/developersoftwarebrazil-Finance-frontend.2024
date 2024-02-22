import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NavbarModule } from "../../components/navbar/navbar.module";
import { SidebarModule } from "../../components/sidebar/sidebar.module";
import { SystemRoutingModule } from "./system-routing.module";
import { SystemComponent } from "./system.component";

@NgModule({
  providers: [],
  declarations: [SystemComponent],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SidebarModule,
    NavbarModule,
  ]
})
export class SystemModule {
  sidebarActive = false;
}
