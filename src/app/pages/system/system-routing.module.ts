import { RouterModule, Routes } from "@angular/router";
import { SystemComponent } from "./system.component";
import { NgModule } from "@angular/core";

const routes: Routes = [{
  path: '', component: SystemComponent
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemRoutingModule { }
