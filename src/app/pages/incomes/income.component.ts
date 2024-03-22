import { MenuService } from '../../services/menuservice';
import { Component, OnInit } from '@angular/core';
import { SelectModel } from '../../models/select.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { CategoryExpenseService } from '../../services/category-expense.service';
import { ExpenseSystemService } from '../../services/expense.system.service';
import { CategoryExpenseModel } from '../../models/category-expense.model';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent implements OnInit {
  //variáveis
  expenseForm: FormGroup;
  systemList = new Array<SelectModel>();
  systemSelected = new SelectModel();

  categoryList = new Array<SelectModel>();
  categorySelected = new SelectModel();

  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,

    public expenseSystemService: ExpenseSystemService,
    public categoryExpenseService: CategoryExpenseService,
    public authSevice: AuthService
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
      this.categoryUserExpenseList();
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

  categoryUserExpenseList(){
    this.categoryExpenseService.CategoryUserExpenseList(this.authSevice.getUserEmail())
      .subscribe((response: Array<CategoryExpenseModel>)=>{
        var categoryExpenseList = [];
        response.forEach((r)=>{
          var item = new SelectModel();
          item.id = r.Id.toString();
          item.name = r.Name;

          categoryExpenseList.push(item)
        });
        this.categoryList = categoryExpenseList;
      })
  }
}
