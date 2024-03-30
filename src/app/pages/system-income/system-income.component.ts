import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../services/menuservice';
import { Component, OnInit } from '@angular/core';
import { SelectModel } from '../../models/select.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ExpenseSystemModel } from '../../models/expense.system.model';
import { IncomeSystemService } from '../../services/ncome.system.service';
import { IncomeSystemModel } from '../../models/income.system.model';

@Component({
  selector: 'system',
  templateUrl: './system-income.component.html',
  styleUrl: './system-income.component.scss'
})
export class SystemIncomeComponent {
  //variáveis
  systemForm: FormGroup;

  //Deifine qual tela será vixualizada no sistema
  screenType: number = 1;// 1-listagem, 2-cadastro, 3-edição, 4-deletar

   //Cofigurações para a tabela de listagens
   systemIncomeTableList: Array<IncomeSystemModel>;
   id: string;
   page: number = 1;
   config: any;
   pagination: boolean = true;
   itemPerPages: number = 5;// indica a quantidade de itens exibidos por págin

   systemIncomeList = new Array<SelectModel>();
   systemIncomeSelected = new SelectModel();

  constructor(
    private router: Router,
    public incomeSystemService: IncomeSystemService,
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.menuService.menuSelected = 2;
    this.configPage();
    this.systemUserIncomeList();
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

  //Métodos default da  aplicção
  dataForm() {
    return this.systemForm.controls;
  }

  sendData() {
    debugger
    var data = this.dataForm();

    alert(data["name"].value);
    let item = new IncomeSystemModel();
    item.Name = data["name"].value;

    item.Id = 0;
    item.Month =0;
    item.DayMonthlyBookClose = 0;
    item.Year =0;

    // faz a chamada no backend
    this.incomeSystemService.AddSystemIncome(item)
      // se tudo ocorreu certo
      .subscribe((response: IncomeSystemModel) => {
        this.systemForm.reset();

        this.incomeSystemService.RegisterUserOnSystemIncome(response.Id, this.authService.getUserEmail())
          .subscribe((response: any) => {
            debugger
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
  systemUserIncomeList() {
    this.screenType = 1;

    this.incomeSystemService.SystemUserIncomeList(this.authService.getUserEmail())
      .subscribe((response: Array<IncomeSystemModel>) => {
        this.systemIncomeTableList = response;

      }
        , (error) => console.error(error), () => { })
  }
}
