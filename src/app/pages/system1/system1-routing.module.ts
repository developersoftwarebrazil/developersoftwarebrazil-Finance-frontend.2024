import { RouterModule, Routes } from "@angular/router";
import { SystemComponent1 } from "./system1.component";
import { NgModule } from "@angular/core";

const routes: Routes = [{
  path: '', component: SystemComponent1
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemRoutingModule1 { }
