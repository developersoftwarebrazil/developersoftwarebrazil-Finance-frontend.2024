import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../services/menuservice';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SystemExpenseModel } from '../../models/expense.system.model';
import { SystemIncomeModel } from '../../models/income.system.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SystemExpenseService } from '../../services/expense.system.service';
import { SystemIncomeService } from '../../services/ncome.system.service';
import { UserSystemExpenseService } from '../../services/user.system.expense.service';
import { UserSystemIncomeService } from '../../services/user.system.income.service';

@Component({
  selector: 'system',
  templateUrl: './system2.component.html',
  styleUrl: './system2.component.scss'
})
export class SystemComponent2 implements OnInit {

  //==Variávies
  //Globals
  @Input() sidebarActive = false;
  @Input() isSidebarActive = false;
  window: number = 1; // 1= listagem 2= cadastro 3= edição

  checked = false;
  disabled = false;
  textValid: string = 'Campo obrigatório!';
  generateExpenseCopy = 'accent';

  systemForm: FormGroup;


  // Despesas

  tableListSystemExpense: Array<SystemExpenseModel>;
  id: string;
  page: number = 1;
  config: any;
  paginations: boolean = true;
  itemsPerPages: number = 10;

  tableListUserSystemExpense: Array<any>;
  id1: string;
  page1: number = 1;
  config1: any;
  itemPerPage1: number = 10;

  editItemExpense: SystemExpenseModel;

  //Invextiemnots

  tableListSystemIncome: Array<SystemIncomeModel>;
  id2: string;
  page2: number = 1;
  config2: any;
  paginations2: boolean = true;
  itemPerPage2: number = 10;

  tableListUserSystemIncome: Array<any>;
  id3: string;
  page3: number = 1;
  config3: any;
  itemPerPage3: number = 10;

  editItemIncome: SystemIncomeModel;

  // usuários
  userSystemEmail: string = '';
  userSystemEmailValid: boolean = true;

  constructor(
    private router: Router,
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public systemExpenseService: SystemExpenseService,
    public systemIncomeService: SystemIncomeService,
    public userSystemExpenseService: UserSystemExpenseService,
    public userSystemIncomeService: UserSystemIncomeService
  ) { }


  ngOnInit(): void {
    this.menuService.menuSelected = 2;
    this.configPage();
    this.SystemExpenseUserList();
    this.SystemUserIncomeList();

    this.systemForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      month: ['', [Validators.required]],
      monthCopy: ['', [Validators.required]],
      year: ['', [Validators.required]],
      yearCopy: ['', [Validators.required]],
      dayMonthlyBookClose: ['', [Validators.required]],
    })
  }

  //applicação
  formData() {
    return this.systemForm.controls;
  }
  sendData() {
    debugger
    var data = this.formData();
    if (this.editItemExpense) {
      this.editItemExpense.PropertyName = '';
      this.editItemExpense.Messages = '';
      this.editItemExpense.Notification = [];

      this.editItemExpense.Name = data["name"].value;
      this.editItemExpense.Month = data["month"].value;
      this.editItemExpense.MonthCopy = data["monthCopy"].value;
      this.editItemExpense.Year = data["year"].value;
      this.editItemExpense.YearCopy = data["yearCopy"].value;
      this.editItemExpense.GenerateExpensesCopy = this.checked;

      this.systemExpenseService.UpdateSystemExpense(this.editItemExpense)
        .subscribe((response: SystemExpenseModel) => {
          this.systemForm.reset();
          this.SystemExpenseUserList();
        }, (error) => console.error(error), () => { });

    } else {
      let item = new SystemExpenseModel();
      item.Name = data['name'].value;

      item.Id = 0;
      item.Month = data['month'].value;
      item.MonthCopy = data['monthCopy'].value;
      item.Year = data['year'].value;
      item.YearCopy = data['yearCopy'].value;
      item.DayMonthlyBookClose = data['dayMonthlyBookClose'].value;
      item.GenerateExpensesCopy = this.checked;

      this.systemExpenseService.AddSystemExpense(item)
        .subscribe((response: SystemExpenseModel) => {
          this.systemForm.reset();

          this.systemExpenseService.RegisterUserOnSystemExpense(response.Id, this.authService.getUserEmail())
            .subscribe((repsonse: any) => {
              this.SystemExpenseUserList();
            }, (error) => console.error(error), () => { })
        }, (error) => console.error(error), () => { })
    }

    if (this.editItemIncome) {
      this.editItemIncome.PropertyName = '';
      this.editItemIncome.Messages = '';
      this.editItemIncome.Notification = [];

      this.editItemIncome.Name = data["name"].value;
      this.editItemIncome.Month = data["month"].value;
      this.editItemIncome.Year = data["year"].value;

      this.systemIncomeService.UpdateSystemIncome(this.editItemIncome)
        .subscribe((response: SystemIncomeModel) => {
          this.systemForm.reset();
          this.SystemUserIncomeList();
        }, (error) => console.error(error), () => { });

    } else {
      let item = new SystemIncomeModel();
      item.Name = data['name'].value;

      item.Id = 0;
      item.Month = data['month'].value;
      item.Year = data['year'].value;
      item.DayMonthlyBookClose = data['dayMonthlyBookClose'].value;

      this.systemIncomeService.AddSystemIncome(item)
        .subscribe((response: SystemIncomeModel) => {
          this.systemForm.reset();

          this.systemIncomeService.RegisterUserOnSystemIncome(response.Id, this.authService.getUserEmail())
            .subscribe((repsonse: any) => {
              this.SystemUserIncomeList();
            }, (error) => console.error(error), () => { })
        }, (error) => console.error(error), () => { })
    }
  }
  register() {
    this.window == 0;
    this.systemForm.reset();
  }



  //Navega para a dashboard
  goToHome() {
    this.router.navigate(['/dashboard']);
  }

  //Configurações da pagian
  configPage() {

    this.id = this.generateIdToPageConfigOfPagiantion();
    this.config = {
      id: this.id,
      currentPage: this.page,
      itemsPerPage: this.itemsPerPages
    };

    this.id1 = this.generateIdToPageConfigOfPagiantion();
    this.config1 = {
      id: this.id1,
      currentPage: this.page1,
      itemsPerPage: this.itemsPerPages
    };

    this.id2 = this.generateIdToPageConfigOfPagiantion();
    this.config2 = {
      id: this.id2,
      currentPage: this.page2,
      itemsPerPage: this.itemPerPage2,
    };

    this.id3 = this.generateIdToPageConfigOfPagiantion();
    this.config3 = {
      id: this.id3,
      currentPage: this.page3,
      itemsPerPage: this.itemPerPage3,
    };
  }

  isPayedHandleChange(item: any) {
    this.checked = item.checked as boolean;
  }

  generateIdToPageConfigOfPagiantion() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var characterLength = characters.length;
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * characterLength));
    }
    return result;
  }

  changePage(event: any) {
    this.page = event;
    this.config.currentPage = this.page;
  }
  changeItemsPerPage() {
    this.page = 1
    this.config.currentPage = this.page;
    this.config.itemsPerPage = this.itemsPerPages;
  }

  changePage1(event: any) {
    this.page1 = event;
    this.config1.currentPage = this.page1;
  }
  changeItemsPerPage1() {
    this.page1 = 1
    this.config1.currentPage = this.page1;
    this.config1.itemsPerPage = this.itemPerPage1;
  }

  changePage2(event: any) {
    this.page2 = event;
    this.config2.currentPage = this.page2;
  }
  changeItemsPerPage2() {
    this.page2 = 1
    this.config2.currentPage = this.page2;
    this.config2.itemsPerPage = this.itemPerPage2;
  }

  changePage3(event: any) {
    this.page3 = event;
    this.config3.currentPage = this.page3;
  }
  changeItemsPerPage3() {
    this.page3 = 1
    this.config3.currentPage = this.page3;
    this.config3.itemsPerPage = this.itemPerPage3;
  }

  //Despesas
  SystemExpenseUserList() {
    this.editItemIncome = null;
    this.window = 1;

    this.systemExpenseService.SystemExpenseUserList(this.authService.getUserEmail())
      .subscribe((response: Array<SystemExpenseModel>) => {
        this.tableListSystemExpense = response;
      })
  }

  UserSystemExpenseList() {

    this.userSystemExpenseService.UserSystemExpenseList(this.editItemExpense.Id)
      .subscribe((response: Array<any>) => {
        this.tableListUserSystemExpense = response;
      })
  }

  addSystenExpenseUser() {
    this.userSystemEmailValid = true;
    if (!this.userSystemEmailValid) {
      this.userSystemEmailValid = false;
    } else {
      this.systemExpenseService.RegisterUserOnSystemExpense(this.editItemIncome.Id, this.userSystemEmail)
        .subscribe((response: any) => {
          this.editExpense(this.editItemExpense.Id)
          this.userSystemEmail = '';
        }, (error) => console.error(error), () => { })
    }
  }

  excludeExpwnse(id: number) {
    this.userSystemExpenseService.DeleteUserOnSystemExpense(id)
      .subscribe((response: SystemExpenseModel) => {
        if (response) {
          this.editExpense(this.editItemExpense.Id);
          this.userSystemEmail = '';
        }
      }, (error) => console.error(error));
  }

  editExpense(id: number) {
    this.systemExpenseService.GetSystemExpense(id)
      .subscribe((response: SystemExpenseModel) => {
        if (response) {
          this.editItemExpense = response;
          this.window = 2;

          var data = this.formData();
          data['name'].setValue(this.editItemExpense.Name);
          data['month'].setValue(this.editItemExpense.Month);
          data['monthCopy'].setValue(this.editItemExpense.MonthCopy);
          data['year'].setValue(this.editItemExpense.Year);
          data['yearCopy'].setValue(this.editItemExpense.YearCopy);
          data['dayMonthlyBookClose'].setValue(this.editItemExpense.DayMonthlyBookClose);
          this.checked = this.editItemExpense.GenerateExpensesCopy;

          this.SystemExpenseUserList();
        }
      }, (error) => console.error(error), () => { });

  }

  //Investimento
  SystemUserIncomeList() {
    this.editItemIncome = null;
    this.window = 1;

    this.systemIncomeService.SystemUserIncomeList(this.authService.getUserEmail())
      .subscribe((response: Array<SystemIncomeModel>) => {
        this.tableListSystemIncome = response;
      }, (error) => console.error(error), () => { })
  }
  UserSystemIncomeList() {
    this.userSystemIncomeService.UserSystemIncomeList(this.editItemIncome.Id)
      .subscribe((response: Array<any>) => {
        this.tableListUserSystemIncome = response
      });
  }

  addSystenIncomeUser() {
    this.userSystemEmailValid = true;
    if (!this.userSystemEmailValid) {
      this.userSystemEmailValid = false;
    } else {
      this.systemIncomeService.RegisterUserOnSystemIncome(this.editItemIncome.Id, this.userSystemEmail)
        .subscribe((response: any) => {
          this.editIncome(this.editItemIncome.Id)
          this.userSystemEmail = '';
        }, (error) => console.error(error), () => { })
    }
  }
  excludeIncome(id: number) {
    this.userSystemIncomeService.DeleteUserOnSystemIncome(id)
      .subscribe((response: SystemIncomeModel) => {
        if (response) {
          this.editIncome(this.editItemIncome.Id);
          this.userSystemEmail = '';
        }
      }, (error) => console.error(error));
  }

  editIncome(id: number) {
    this.systemIncomeService.GetSystemIncome(id)
      .subscribe((response: SystemIncomeModel) => {
        if (response) {
          this.editItemIncome = response;
          this.window = 2;

          var data = this.formData();
          data['name'].setValue(this.editItemIncome.Name);
          data['month'].setValue(this.editItemIncome.Month);
          data['year'].setValue(this.editItemIncome.Year);
          data['dayMonthlyBookClose'].setValue(this.editItemIncome.DayMonthlyBookClose);

          this.SystemUserIncomeList();
        }
      }, (error) => console.error(error), () => { })
  }

}
