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
  // color = 'accent';
  isChecked = false;
  // disabled = false;


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
        date: ['', [Validators.required]],
        categoryUserExpenseList: ['', [Validators.required]],
        categoryExpenseSelect:['',[Validators.required]]


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

    itemExpense.Id = 0;
    itemExpense.Value = data["value"].value;
    itemExpense.DueDate = data["date"].value;
    itemExpense.PayedOut = this.isChecked;
    itemExpense.TransactionTypes= 1;
    itemExpense.CategoryExpenseId = parseInt(this.categoryExpenseSelected.id)
    itemExpense.Name = data["name"].value;

    this.expenseService.AddExpense(itemExpense)
      .subscribe((response: ExpenseModel) => {
        this.expenseForm.reset();
      }, (error) => console.error(error), () => { })
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
  payedHandleChange(itemExpense: any) {

    this.isChecked = itemExpense.isChecked as boolean;
  }

}
