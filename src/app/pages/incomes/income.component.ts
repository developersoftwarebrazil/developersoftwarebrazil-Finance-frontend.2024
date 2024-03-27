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
        date: ['', [Validators.required]],

        categoryIncomeSelect: ['', [Validators.required]],
        categoryUserIncomeList: ['', [Validators.required]]

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
    itemIncome.Month = 0;
    itemIncome.Year = 0;
    itemIncome.Value = data["value"].value;
    itemIncome.RegistrationDate = data["date"].value;
    itemIncome.RegistrationChangeDate = data["date"].value;
    itemIncome.IncomeDate = data["date"].value;
    itemIncome.TransactionTypes = 2;
    itemIncome.CategoryIncomeId = parseInt(this.categoryIncomeSelected.id);

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
  PayedhandleChange(item: any) {
    this.checked = item.checked as boolean;
  }
}
