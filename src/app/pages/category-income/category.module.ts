import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarModule } from "../../components/navbar/navbar.module";
import { SidebarModule } from "../../components/sidebar/sidebar.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { CategoryIncomeComponent } from "./category-income.component";
import { CategoryIncomeRoutingModule } from "./category-income-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";


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
    NgxPaginationModule

  ]
})
export class CategoryIncomeModule {

}
