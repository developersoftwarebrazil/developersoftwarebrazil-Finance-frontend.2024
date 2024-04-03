import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarModule } from "../../components/navbar/navbar.module";
import { SidebarModule } from "../../components/sidebar/sidebar.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { CategoryExpenseComponent } from "./category-expense.component";
import { CategoryExpenseRoutingModule } from "./category-expense-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";


@NgModule({
  providers: [],
  declarations: [CategoryExpenseComponent],
  imports: [
    CommonModule,
    CategoryExpenseRoutingModule,

    SidebarModule,
    NavbarModule,

    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,

    NgxPaginationModule

  ]
})
export class CategoryExpenseModule {

}
