import { MenuService } from '../../services/menuservice';
import { Component, OnInit } from '@angular/core';
import { SelectModel } from '../../models/select.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { CategoryIncomeService } from '../../services/category-Income.service';
import { CategoryIncomeModel } from '../../models/category-income.model';
import { IncomeModel } from '../../models/income.model';
import { IncomeService } from '../../services/income.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent implements OnInit {
  //variáveis
  incomeForm: FormGroup;
  color = 'accent';
  checked = false;
  disabled = false;


  categoryIncomeList = new Array<SelectModel>();
  categoryIncomeSelected = new SelectModel();

  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public incomeService: IncomeService,
    public categoryIncomeService: CategoryIncomeService,
    public authSevice: AuthService
  ) { }
  ngOnInit(): void {
    this.menuService.menuSelected = 4;

    this.incomeForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        value: ['', [Validators.required]],
        data: ['', [Validators.required]],
        systemIncomeSelect: ['', [Validators.required]],
        categoryInccomeSelect: ['', [Validators.required]],

      });
    this.categoryUserIncomeList();
  }

  // apllicção
  dataForm() {
    return this.incomeForm.controls;
  }
  sendData() {
    debugger
    var data = this.dataForm();

    let itemIncome = new IncomeModel();
    itemIncome.Id = 0;
    itemIncome.Name = data["name"].value;
    itemIncome.Value = data["value"].value;
    itemIncome.IncomeDate = data["value"].value;

    this.incomeService.AddIncome(itemIncome)
      .subscribe((reponse: IncomeModel) => {
        this.incomeForm.reset();
      }, (error) => console.error(error), () => { })
  }

  categoryUserIncomeList() {
    this.categoryIncomeService.CategoryUserIncomeList(this.authSevice.getUserEmail())
      .subscribe((response: Array<CategoryIncomeModel>) => {
        var categoryIncomeList = [];
        response.forEach((r) => {
          var item = new SelectModel();
          item.id = r.Id.toString();
          item.name = r.Name;

          categoryIncomeList.push(item)
        });
        this.categoryIncomeList = categoryIncomeList;
      })
  }

  //método psrs side toggle
  PayedhandleChange(item:any) {
    this.checked = item.checked as boolean;
  }
}
