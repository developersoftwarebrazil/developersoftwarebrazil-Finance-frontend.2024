import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { MenuService } from "../../services/menuservice";

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrl: './system.component.scss'
})
export class SystemComponent implements OnInit {


  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    public menuService: MenuService
    ) { }

  systemForm: FormGroup;

  ngOnInit(): void {
    this.menuService.menuSelected = 2;
  }

  formData(){
   return this.systemForm.controls;
  }

}
