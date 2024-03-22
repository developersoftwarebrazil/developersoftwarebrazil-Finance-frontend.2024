import { MenuService } from '../../services/menuservice';
import { Component, OnInit } from '@angular/core';
import { SelectModel } from '../../models/select.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseSystemService } from '../../services/expense.system.service';
import { ExpenseSystemModel } from '../../models/expense.system.model';
import { AuthService } from '../../services/auth.service';
import { CategoryExpenseModel } from '../../models/category-expense.model';
import { CategoryExpenseService } from '../../services/category-expense.service';


@Component({
  selector: 'app-category-expense',
  templateUrl: './category-expense.component.html',
  styleUrl: './category-expense.component.scss'
})
export class CategoryExpenseComponent implements OnInit {
  //variáveis
  categoryExpenseForm: FormGroup;


  systemList = new Array<SelectModel>();
  systemExpenseSelected = new SelectModel();


  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public expenseSystemService: ExpenseSystemService,
    public categoryExpenseService: CategoryExpenseService,
    public authSevice: AuthService
  ) { }

  ngOnInit(): void {

    this.menuService.menuSelected = 3;

    this.categoryExpenseForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      systemExpenseSelected: ['', [Validators.required]],
    });
    this.systemExpenseUserList();
  }

  // apllicção
  dataForm() {
    return this.categoryExpenseForm.controls;
  }

  sendExpenseData() {
    debugger
    var data = this.dataForm();

    let itemExpense = new CategoryExpenseModel();

    itemExpense.Name = data["name"].value;
    itemExpense.Id = 0;
    itemExpense.SystemExpenseId = parseInt(this.systemExpenseSelected.id);
    itemExpense.SystemIncomeId = 1;

    this.categoryExpenseService.AddCategory(itemExpense)
      .subscribe((response: CategoryExpenseModel) => {
        this.categoryExpenseForm.reset();
      }, (error) => console.error(error), () => { })

  }

  systemExpenseUserList() {

    this.expenseSystemService.SystemExpenseUserList(this.authSevice.getUserEmail())
      .subscribe((response: Array<ExpenseSystemModel>) => {
        var systemExpenseList = [];

        response.forEach((r) => {
          var item = new SelectModel();
          item.id = r.Id.toString();
          item.name = r.Name

          systemExpenseList.push(item)
        });
        this.systemList = systemExpenseList;
      })
  }

}
