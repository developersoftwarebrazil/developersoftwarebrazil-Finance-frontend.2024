import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SystemExpenseComponent } from "./system-expense.component";

const routes: Routes = [{
  path: '', component: SystemExpenseComponent
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemExpenseRoutingModule { }
