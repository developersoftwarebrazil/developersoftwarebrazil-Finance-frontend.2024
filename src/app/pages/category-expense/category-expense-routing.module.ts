import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CategoryExpenseComponent } from "./category-expense.component";

const routes: Routes = [{
  path: '', component: CategoryExpenseComponent
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CategoryExpenseRoutingModule { }
