import { MenuService } from '../../services/menuservice';
import { Component, OnInit } from '@angular/core';
import { SelectModel } from '../../models/select.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CategoryIncomeService } from '../../services/category-Income.service';
import { IncomeSystemService } from '../../services/ncome.system.service';
import { CategoryIncomeModel } from '../../models/category-income.model';
import { IncomeModel } from '../../models/income.model';
import { IncomeService } from '../../services/income.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent implements OnInit {
  //variáveis
  incomeForm: FormGroup;
  color = 'accent';
  checked = false;
  disabled = false;
  // systemList = new Array<SelectModel>();
  // systemSelected = new SelectModel();

  categoryList = new Array<SelectModel>();
  categorySelected = new SelectModel();

  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,

    public incomeSystemService: IncomeSystemService,
    public incomeService: IncomeService,
    public categoryIncomeService: CategoryIncomeService,
    public authSevice: AuthService
  ) { }
  ngOnInit(): void {
    this.menuService.menuSelected == 5;

    this.incomeForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        value: ['', [Validators.required]],
        data: ['', [Validators.required]],

        categoryUserIncomeList: ['', [Validators.required]],

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

    itemIncome.Name = data["name"].value;
    itemIncome.Id = 0;
    itemIncome.CategoryId = parseInt(this.categorySelected.id);

    this.incomeService.AddIncome(itemIncome)
      .subscribe((response: IncomeModel) => {
        this.incomeForm.reset();
      }, (error) => console.error(error), () => { })
  }

  handleChangePayed(item: any) {
    this.checked = item.checked as boolean;
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
        this.categoryList = categoryIncomeList;
      })
  }


}
