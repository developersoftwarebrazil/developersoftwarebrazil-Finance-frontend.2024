import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarModule } from "../../components/navbar/navbar.module";
import { SidebarModule } from "../../components/sidebar/sidebar.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { CategoryComponent } from "./category.component";
import { CategoryRoutingModule } from "./category-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  providers: [],
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    
    SidebarModule,
    NavbarModule,

    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,

  ]
})
export class CategoryModule {

}
