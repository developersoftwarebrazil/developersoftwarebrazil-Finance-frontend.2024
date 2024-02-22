import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarModule } from "../../components/navbar/navbar.module";
import { SidebarModule } from "../../components/sidebar/sidebar.module";
import { CategoryComponent} from "./category.component";
import { CategoryRoutingModule } from "./category-routing.module";

@NgModule({
  providers: [],
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SidebarModule,
    NavbarModule,

  ]
})
export class CategoryModule {

}
