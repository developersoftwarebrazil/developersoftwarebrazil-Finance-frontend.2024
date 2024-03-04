import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from './../../services/menuservice';
import { Component, OnInit } from '@angular/core';
import { SelectModel } from '../../models/select.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  //variáveis
  systemForm: FormGroup;
  systemList= new Array<SelectModel>();
  systemSelected = new SelectModel();

  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.menuService.menuSelected == 3;

    this.systemForm = this.formBuilder.group({ name: ['', [Validators.required]] });
  }

  // apllicção
  dataForm() {
    return this.systemForm.controls;
  }
  sendData() {
    debugger
    var data = this.dataForm();
    alert(data['name'].value);
  }
}
