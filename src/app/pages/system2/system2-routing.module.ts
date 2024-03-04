import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SystemComponent2 } from "./system2.component";

const routes: Routes = [{
  path: '', component: SystemComponent2
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemRoutingModule2 { }
