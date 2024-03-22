import { MenuService } from '../../services/menuservice';
import { Component, OnInit } from '@angular/core';
import { SelectModel } from '../../models/select.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { CategoryIncomeModel } from '../../models/category-income.model';

import { IncomeSystemService } from '../../services/ncome.system.service';
import { IncomeSystemModel } from '../../models/income.system.model';
import { CategoryIncomeService } from '../../services/category-Income.service';

@Component({
  selector: 'app-category-income',
  templateUrl: './category-income.component.html',
  styleUrl: './category-income.component.scss'
})
export class CategoryIncomeComponent implements OnInit {
  //variáveis
  categoryIncomeForm: FormGroup;
  systemTheme: string;

  systemList = new Array<SelectModel>();
  systemExpenseSelected = new SelectModel();
  systemIncomeSelected = new SelectModel();

  constructor(
    private themeService: ThemeService,
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public incomeSystemService: IncomeSystemService,
    public categoryIncomeService: CategoryIncomeService,
    public authSevice: AuthService
  ) { }

  ngOnInit(): void {

    this.menuService.menuSelected = 3.1;

    this.categoryIncomeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      systemIncomeSelected: ['', [Validators.required]],
    });
    this.systemIncomeUserList();
  }

  // apllicção
  dataForm() {
    return this.categoryIncomeForm.controls;
  }

  sendIncomeData() {
    debugger
    var data = this.dataForm();

    let itemIncome = new CategoryIncomeModel();

    itemIncome.Name = data["name"].value;
    itemIncome.Id = 0;
    itemIncome.SystemIncomeId = parseInt(this.systemIncomeSelected.id);
    itemIncome.SystemExpenseId = 1;
    this.categoryIncomeService.AddCategory(itemIncome)
      .subscribe((response: CategoryIncomeModel) => {
        this.categoryIncomeForm.reset();
      }, (error) => console.error(error), () => { })
  }

  systemIncomeUserList() {

    this.incomeSystemService.SystemUserIncomeList(this.authSevice.getUserEmail())
      .subscribe((response: Array<IncomeSystemModel>) => {
        var systemIncomeList = [];

        response.forEach((r) => {
          var item = new SelectModel();
          item.id = r.Id.toString();
          item.name = r.Name

          systemIncomeList.push(item)
        });
        this.systemList = systemIncomeList;
      })
  }
}
