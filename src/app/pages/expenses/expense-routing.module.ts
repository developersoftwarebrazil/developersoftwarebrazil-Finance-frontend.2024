import { ExpenseModule } from './expense.module';
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ExpenseComponent } from "./expense.component";

const routes: Routes = [{
  path: '', component: ExpenseComponent
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ExpenseRoutingModule { }
