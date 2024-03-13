
import { MenuService } from './../../services/menuservice';
import { Component, OnInit } from '@angular/core';
import { SelectModel } from '../../models/select.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  //variáveis
  categoryForm: FormGroup;
  systemList = new Array<SelectModel>();
  systemSelected = new SelectModel();

  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.menuService.menuSelected == 3;

    this.categoryForm = this.formBuilder.group({ name: ['', [Validators.required]] });
  }

  // apllicção
  dataForm() {
    return this.categoryForm.controls;
  }
  sendData() {
    debugger
    var data = this.dataForm();
    alert(data['name'].value);
  }
}
