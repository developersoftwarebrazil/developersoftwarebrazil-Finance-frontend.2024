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
import { Router } from '@angular/router';

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

  generateExpenseCopy = 'accent';

  // Define qual tela será visualizada no sistema
  screenType = 1; // 1-listagem, 2-cadastro, 3-edição, 4-deletar

  //Cofigurações para a tabela de listagens
  expenseTableList: Array<ExpenseModel>;
  id: string;
  page: number = 1;
  config: any;
  pagination: boolean = true;
  itemPerPages: number = 5;// indica a quantidade de itens exibidos por págin
  ExpenseList = new Array<SelectModel>();
  ExpenseSelected = new SelectModel();

  categoryExpenseList = new Array<SelectModel>();
  categoryExpenseSelected = new SelectModel();

  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public router: Router,
    public expenseSystemService: ExpenseSystemService,
    public expenseService: ExpenseService,
    public categoryExpenseService: CategoryExpenseService,
    public authSevice: AuthService
  ) { }
  ngOnInit(): void {
    this.menuService.menuSelected = 5;

    this.configPage();
    this.expenseUserList();
    this.categoryUserExpenseList();
    this.expenseForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        value: ['', [Validators.required]],
        date: ['', [Validators.required]],
        categoryUserExpenseList: ['', [Validators.required]],
        categoryExpenseSelect: ['', [Validators.required]]


      });


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
    itemExpense.TransactionTypes = 1;
    itemExpense.CategoryExpenseId = parseInt(this.categoryExpenseSelected.id)
    itemExpense.Name = data["name"].value;

    this.expenseService.AddExpense(itemExpense)
      .subscribe((response: ExpenseModel) => {
        this.expenseForm.reset();
        this.expenseUserList();

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

  // redireciona para a pagiá home do site
  goToHomePage() {
    this.router.navigate(['/dashboard']);
  }
  //métodos usados para carregar e configurar as tableas
  configPage() {
    this.id = this.configPageToGenerateId();
    this.config = {
      id: this.id,
      currentPage: this.page,
      itemsPerPage: this.itemPerPages,
    };
  }

  configPageToGenerateId() {
    var result = '';
    var charecters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = charecters.length;
    for (var i = 0; i < 5; i++) {
      result += charecters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  //mostra a pagina de cadastro
  register() {
    this.screenType = 2;
    this.expenseForm.reset();
  }
  itemPerPagesChange() {
    this.page = 1;
    this.config.currentPage = this.page;
    this.config.itemsPerPage = this.page;
  }
  pageChange(event: any) {
    this.page = event;
    this.config.currentPage = this.page;
  }
  expenseUserList() {
    this.screenType = 1;

    this.expenseService.ExpenseUserList(this.authSevice.getUserEmail())
      .subscribe((response: Array<ExpenseModel>) => {
        this.expenseTableList = response;

      }
        , (error) => console.error(error), () => { })
  }

}
