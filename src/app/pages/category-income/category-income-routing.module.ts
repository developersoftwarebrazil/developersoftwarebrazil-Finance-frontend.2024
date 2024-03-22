import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CategoryIncomeComponent } from "./category-income.component";

const routes: Routes = [{
  path: '', component: CategoryIncomeComponent
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CategoryIncomeRoutingModule { }
