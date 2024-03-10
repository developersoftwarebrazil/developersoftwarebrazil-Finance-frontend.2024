import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SidebarComponent } from "./sidebar.component";
import { NavbarModule } from "../navbar/navbar.module";

@NgModule({
  declarations:[ SidebarComponent],
  imports:[
    CommonModule,
    FormsModule,
    NavbarModule
  ],
  exports:[SidebarComponent]
})
export class SidebarModule{

  
}
