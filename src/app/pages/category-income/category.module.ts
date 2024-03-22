import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarModule } from "../../components/navbar/navbar.module";
import { SidebarModule } from "../../components/sidebar/sidebar.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { CategoryIncomeComponent } from "./category-income.component";
import { CategoryIncomeRoutingModule } from "./category-income-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  providers: [],
  declarations: [CategoryIncomeComponent],
  imports: [
    CommonModule,
    CategoryIncomeRoutingModule,

    SidebarModule,
    NavbarModule,

    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,

  ]
})
export class CategoryIncomeModule {

}
