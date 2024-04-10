import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ExpenseSystemModel } from "../../models/expense.system.model";
import { SelectModel } from "../../models/select.model";
import { AuthService } from "../../services/auth.service";
import { ExpenseSystemService } from "../../services/expense.system.service";
import { MenuService } from "../../services/menuservice";
import { UserSystemExpenseService } from "../../services/user.system.expense.service ";


@Component({
  selector: 'system',
  templateUrl: './system-expense.component.html',
  styleUrl: './system-expense.component.scss'
})
export class SystemExpenseComponent {
  //variáveis
  systemForm: FormGroup;

  disabled = false;
  checked = false;

  generateExpenseCopy = 'accent';
  userEmailSystemExpense: string = '';
  userEmailSystemExpenseValid: boolean = true;
  validText: string = 'Campo obrigatório!';

  // Define qual tela será visualizada no sistema
  screenType = 1; // 1-listagem, 2-cadastro, 3-edição, 4-deletar

  //Cofigurações para a tabela de listagens do sistema de despesa
  systemExpenseTableList: Array<ExpenseSystemModel>;
  id: string;
  page: number = 1;
  config: any;
  pagination: boolean = true;
  itemPerPages: number = 5;// indica a quantidade de itens exibidos por página

  //Cofigurações para a tabela de listagens de usuário do sistema de despesa
  systemUserExpenseTableList: Array<any>;
  userId: string;
  pageUser: number = 1;
  configUser: any;
  paginationUser: boolean = true;
  itemPerPagesUser: number = 5;// indica a quantidade de itens exibidos por página



  systemEspenseList = new Array<SelectModel>();
  systemExpenseSelected = new SelectModel();

  constructor(
    private router: Router,
    public expenseSystemService: ExpenseSystemService,
    public userExpenseSystemService: UserSystemExpenseService,
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public authService: AuthService,
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
    if (this.editionItem) {
      this.editionItem.PropertyName = '';
      this.editionItem.Messages = '';
      this.editionItem.Notification = [];

      this.editionItem.Name = data["name"].value;
      this.editionItem.Month = data["month"].value;
      this.editionItem.MonthCopy = data["monthCopy"].value;
      this.editionItem.DayMonthlyBookClose = data["dayMonthlyBookClose"].value;
      this.editionItem.Year = data["year"].value;
      this.editionItem.YearCopy = data["yearCopy"].value;
      this.editionItem.GenerateExpensesCopy = this.checked;


      // faz a chamada no backend
      this.expenseSystemService.UpdateSystemExpense(this.editionItem)
        // se tudo ocorreu certo
        .subscribe((response: ExpenseSystemModel) => {
          this.systemForm.reset();
          this.userSystemExpenseList();

        }, (error) => console.error(error), () => { })
    }
    else {
      let item = new ExpenseSystemModel();

      item.Id = 0;
      item.Name = data["name"].value;
      item.Month = data["month"].value;
      item.MonthCopy = data["monthCopy"].value;
      item.DayMonthlyBookClose = data["dayMonthlyBookClose"].value;;
      item.Year = data["year"].value;
      item.YearCopy = data["yearCopy"].value;
      item.GenerateExpensesCopy = this.checked;

      // faz a chamada no backend
      this.expenseSystemService.AddSystemExpense(item)
        // se tudo ocorreu certo
        .subscribe((response: ExpenseSystemModel) => {
          this.systemForm.reset();

          this.expenseSystemService.RegisterUserOnSystemExpense(response.Id, this.authService.getUserEmail())
            .subscribe((response: any) => {

              this.userSystemExpenseList();
            }, (error) => console.error(error), () => { })
        }, (error) => console.error(error), () => { })
    }
  }

  editionItem: ExpenseSystemModel;
  edition(id: number) {
    this.expenseSystemService.GetExpenseSystem(id)
      .subscribe((response: ExpenseSystemModel) => {
        if (response) {
          this.editionItem = response;
          this.screenType = 3;

          var data = this.dataForm();
          data["name"].setValue(this.editionItem.Name);
          data["month"].setValue(this.editionItem.Month);
          data["monthCopy"].setValue(this.editionItem.MonthCopy);
          data["dayMonthlyBookClose"].setValue(this.editionItem.DayMonthlyBookClose);
          data["year"].setValue(this.editionItem.Year);
          data["yearCopy"].setValue(this.editionItem.YearCopy);
          this.checked = this.editionItem.GenerateExpensesCopy;

          this.userSystemExpenseList();

        }
      }, (error) => console.error(error), () => { })
  }

  expenseCopyHandleChange(item: any) {
    this.checked = item.checked as boolean;
  }
  // redireciona para a página home do site
  goToHomePage() {
    this.router.navigate(['/dashboard']);
  }


  //métodos usados para carregar e configurar as tableas
  configPage() {
    // configuração para sistema
    this.id = this.configPageToGenerateId();
    this.config = {
      id: this.id,
      currentPage: this.page,
      itemsPerPage: this.itemPerPages,
    };
    // configurações para o usuário do sistema
    this.userId = this.configPageToGenerateId();
    this.configUser = {
      id: this.userId,
      currentPage: this.pageUser,
      itemsPerPage: this.itemPerPagesUser,
    }
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
  //navegação
  register() {
    this.screenType = 2;
    this.systemForm.reset();
  }

  registerUser() {
    debugger
    this.screenType = 6;
    this.systemForm.reset();
  }
  listUsers() {
    debugger
    this.screenType = 5;
    this.systemForm.reset();
  }

  // Listagem para sistema de despesas
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
    this.editionItem = null;
    this.screenType = 1;

    this.expenseSystemService.SystemExpenseUserList(this.authService.getUserEmail())
      .subscribe((response: Array<ExpenseSystemModel>) => {
        this.systemExpenseTableList = response;

      }
        , (error) => console.error(error), () => { })


  }

  // Listagem para usuários do sistema de despesas

  itemPerPagesChangeUser() {
    this.pageUser = 1;
    this.config.currentPage = this.pageUser;
    this.config.itemsPerPage = this.pageUser;
  }
  pageChangeUse(event: any) {
    this.pageUser = event;
    this.config.currentPage = this.pageUser;
  }
  // CRUD para o usuáio do sistema
  registerUserOnSystemExpense() {

    this.userEmailSystemExpenseValid = true;

    if (!this.userEmailSystemExpense) {
      this.userEmailSystemExpenseValid = false;
    } else {
      this.expenseSystemService.RegisterUserOnSystemExpense(this.editionItem.Id, this.userEmailSystemExpense)
        .subscribe((response: any) => {
          if (response) {
            this.edition(this.editionItem.Id);
            this.userEmailSystemExpense = '';
          }
        }, (error) => console.error(error), () => { });
    }
    this.listUsers();
  }
  userSystemExpenseList() {

    this.userExpenseSystemService.UserSystemExpenseList(this.editionItem.Id)
      .subscribe((response: Array<any>) => {
        this.systemUserExpenseTableList = response;
      })
  }

  exclude(id: number) {
    this.userExpenseSystemService.DeleteUserOnSystemExpense(id)
      .subscribe((response: ExpenseSystemModel) => {
        if (response) {
          this.edition(this.editionItem.Id);
          this.userEmailSystemExpense = '';
        }
      }, (error) => console.error(error), () => { })
  }
}
