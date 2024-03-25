import { MenuService } from '../../services/menuservice';
import { Component, OnInit } from '@angular/core';
import { SelectModel } from '../../models/select.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ExpenseSystemService } from '../../services/expense.system.service';
import { ExpenseService } from '../../services/expense.service';
import { CategoryExpenseService } from '../../services/category-expense.service';
import { ExpenseModel } from '../../models/expense.model';
import { CategoryExpenseModel } from '../../models/category-expense.model';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent implements OnInit {
  //variáveis
  expenseForm: FormGroup;
  color = 'accent';
  checked = false;
  disabled = false;


  categoryExpenseList = new Array<SelectModel>();
  categoryExpenseSelected = new SelectModel();

  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,

    public expenseSystemService: ExpenseSystemService,
    public expenseService: ExpenseService,
    public categoryExpenseService: CategoryExpenseService,
    public authSevice: AuthService
  ) { }
  ngOnInit(): void {
    this.menuService.menuSelected = 5;

    this.expenseForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        value: ['', [Validators.required]],
        data: ['', [Validators.required]],

        categoryUserExpenseList: ['', [Validators.required]],

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

    let itemExpense = new ExpenseModel();

    itemExpense.Name = data["name"].value;
    itemExpense.Id = 0;
    itemExpense.CategoryId = parseInt(this.categoryExpenseSelected.id);

    this.expenseService.AddExpense(itemExpense)
      .subscribe((response: ExpenseModel) => {
        this.expenseForm.reset();
      }, (error) => console.error(error), () => { })
  }

  handleChangePayed(item: any) {
    this.checked = item.checked as boolean;
  }
  categoryUserExpenseList() {
    this.categoryExpenseService.CategoryUserExpenseList(this.authSevice.getUserEmail())
      .subscribe((response: Array<CategoryExpenseModel>) => {
        var categoryExpenseList = [];
        response.forEach((r) => {
          var item = new SelectModel();
          item.id = r.Id.toString();
          item.name = r.Name;

          categoryExpenseList.push(item)
        });
        this.categoryExpenseList = categoryExpenseList;
      })
  }


}
