import { MenuService } from '../../services/menuservice';
import { Component, OnInit } from '@angular/core';
import { SelectModel } from '../../models/select.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent implements OnInit {
  //variáveis
  expenseForm: FormGroup;
  systemList = new Array<SelectModel>();
  systemSelected = new SelectModel();

  categoryList = new Array<SelectModel>();
  categorySelected = new SelectModel();

  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    this.menuService.menuSelected = 4;

    this.expenseForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        value: ['', [Validators.required]],
        data: ['', [Validators.required]],
        systemSelect: ['', [Validators.required]],
        categorySelect: ['', [Validators.required]],

      });
  }

  // apllicção
  dataForm() {
    return this.expenseForm.controls;
  }
  sendData() {
    debugger
    var data = this.dataForm();
    alert(data['name'].value);
  }
}
