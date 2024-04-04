import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ExpenseSystemModel } from "../../models/expense.system.model";
import { SelectModel } from "../../models/select.model";
import { AuthService } from "../../services/auth.service";
import { ExpenseSystemService } from "../../services/expense.system.service";
import { MenuService } from "../../services/menuservice";

@Component({
  selector: 'system',
  templateUrl: './system-expense.component.html',
  styleUrl: './system-expense.component.scss'
})
export class SystemExpenseComponent {
  //variáveis
  systemForm: FormGroup;

  isChecked = false;
  generateExpenseCopy = 'accent';

  // Define qual tela será visualizada no sistema
  screenType = 1; // 1-listagem, 2-cadastro, 3-edição, 4-deletar

  //Cofigurações para a tabela de listagens
  systemExpenseTableList: Array<ExpenseSystemModel>;
  id: string;
  page: number = 1;
  config: any;
  pagination: boolean = true;
  itemPerPages: number = 5;// indica a quantidade de itens exibidos por págin

  systemEspenseList = new Array<SelectModel>();
  systemExpenseSelected = new SelectModel();

  constructor(
    private router: Router,
    public expenseSystemService: ExpenseSystemService,
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.menuService.menuSelected = 2;

    this.configPage();
    this.systemExpenseUserList();
    this.systemForm = this.formBuilder.group
      ({
        name: ['', [Validators.required]],
        month: ['', [Validators.required]],
        monthCopy: ['', [Validators.required]],
        dayMonthlyBookClose: ['', [Validators.required]],
        year: ['', [Validators.required]],
        yearCopy: ['', [Validators.required]],
    });
  }

  //métodos default da aplicção
  dataForm() {
    return this.systemForm.controls;
  }
  sendData() {
    debugger
    var data = this.dataForm();

    alert(data["name"].value);
    let item = new ExpenseSystemModel();

    item.Id = 0;
    item.Name = data["name"].value;
    item.Month = 0;
    item.MonthCopy = 0;
    item.DayMonthlyBookClose = 0;
    item.Year = 0;
    item.YearCopy = 0;
    item.GenerateExpensesCopy = true;

    // faz a chamada no backend
    this.expenseSystemService.AddSystemExpense(item)
      // se tudo ocorreu certo
      .subscribe((response: ExpenseSystemModel) => {
        this.systemForm.reset();

        this.expenseSystemService.RegisterUserOnSystemExpense(response.Id, this.authService.getUserEmail())
        .subscribe((response: any) => {
          debugger
          this.systemExpenseUserList();
          }, (error) => console.error(error), () => { })
      }, (error) => console.error(error), () => { })
  }
  // redireciona para a pagiá home do site
  goToHomePage(){
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
    this.systemForm.reset();
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
  systemExpenseUserList() {
    this.screenType = 1;

    this.expenseSystemService.SystemExpenseUserList(this.authService.getUserEmail())
      .subscribe((response: Array<ExpenseSystemModel>) => {
        this.systemExpenseTableList = response;

      }
        , (error) => console.error(error), () => { })


  }
}
