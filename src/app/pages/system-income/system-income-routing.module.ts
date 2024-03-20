import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SystemIncomeComponent } from "./system-income.component";

const routes: Routes = [{
  path: '', component: SystemIncomeComponent
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemIncomeRoutingModule { }
