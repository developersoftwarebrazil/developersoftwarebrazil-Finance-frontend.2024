import { MenuService } from '../../services/menuservice';
import { Component, OnInit } from '@angular/core';
import { SelectModel } from '../../models/select.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { CategoryIncomeService } from '../../services/category-Income.service';
import { CategoryIncomeModel } from '../../models/category-income.model';
import { IncomeModel } from '../../models/income.model';
import { IncomeService } from '../../services/income.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent implements OnInit {
  //variáveis
  incomeForm: FormGroup;
  color = 'accent';
  checked = false;
  disabled = false;

  // Define qual tela será visualizada no sistema
  screenType = 1; // 1-listagem, 2-cadastro, 3-edição, 4-deletar

  //Cofigurações para a tabela de listagens
  incomeTableList: Array<IncomeModel>;
  id: string;
  page: number = 1;
  config: any;
  pagination: boolean = true;
  itemPerPages: number = 5;// indica a quantidade de itens exibidos por págin

  categoryIncomeList = new Array<SelectModel>();
  categoryIncomeSelected = new SelectModel();

  constructor(
    public router: Router,
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public incomeService: IncomeService,
    public categoryIncomeService: CategoryIncomeService,
    public authSevice: AuthService
  ) { }
  ngOnInit(): void {
    this.menuService.menuSelected = 4;
    this, this.configPage();
    this.incomeUserList();
    this.incomeForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        value: ['', [Validators.required]],
        date: ['', [Validators.required]],

        categoryIncomeSelect: ['', [Validators.required]],
        categoryUserIncomeList: ['', [Validators.required]]

      });
    this.categoryUserIncomeList();
  }

  // apllicção
  dataForm() {
    return this.incomeForm.controls;
  }
  sendIncomeData() {

    var data = this.dataForm();

    if (this.editionItem) {
      this.editionItem.PropertyName = '';
      this.editionItem.Messages = '';
      this.editionItem.Notification = [];

      this.editionItem.Name = data["name"].value;
      this.editionItem.Value = data["value"].value;
      this.editionItem.IncomeDate = data["date"].value;
      this.editionItem.RegistrationChangeDate = data["date"].value;

      this.editionItem.CategoryIncomeId = parseInt(this.categoryIncomeSelected.id);

      this.incomeService.UpdateIncome(this.editionItem)
        .subscribe((reponse: IncomeModel) => {
          this.incomeForm.reset();
          this.incomeUserList();
        }, (error) => console.error(error), () => { })
        
    } else {
      let itemIncome = new IncomeModel();

      itemIncome.Id = 0;
      itemIncome.Name = data["name"].value;
      itemIncome.Month = 0;
      itemIncome.Year = 0;
      itemIncome.Value = data["value"].value;
      itemIncome.RegistrationDate = data["date"].value;
      itemIncome.RegistrationChangeDate = data["date"].value;
      itemIncome.IncomeDate = data["date"].value;
      itemIncome.TransactionTypes = 2;
      itemIncome.CategoryIncomeId = parseInt(this.categoryIncomeSelected.id);

      this.incomeService.AddIncome(itemIncome)
        .subscribe((reponse: IncomeModel) => {
          this.incomeForm.reset();
          this.incomeUserList();
        }, (error) => console.error(error), () => { })
    }
  }

  editionItem: IncomeModel;

  edition(id: number) {
    this.incomeService.GetIncome(id)
      .subscribe((response: IncomeModel) => {

        if (response) {

          this.editionItem = response;
          this.screenType = 3;

          this.categoryUserIncomeList(response.CategoryIncomeId);

          var data = this.dataForm();

          data["name"].setValue(this.editionItem.Name);

          var dateToString = response.IncomeDate.toString();
          var dateFull = dateToString.split('-');
          var dayFull = dateFull[2].split('T');
          var day = dayFull[0];
          var month = dateFull[1];
          var year = dateFull[0];

          var dateInput = year + '-' + month + '-' + day;
          data['date'].setValue(dateInput);

        }
      }, (error) => console.error(error), () => { })
  }

  categoryUserIncomeList(id: number = null) {
    this.categoryIncomeService.CategoryUserIncomeList(this.authSevice.getUserEmail())
      .subscribe((response: Array<CategoryIncomeModel>) => {
        var categoryIncomeList = [];
        response.forEach((r) => {
          var item = new SelectModel();
          item.id = r.Id.toString();
          item.name = r.Name;

          categoryIncomeList.push(item);

          if (id && id == r.Id) {
            this.categoryIncomeSelected = item;
          }
        });
        this.categoryIncomeList = categoryIncomeList;
      })
  }

  //método psrs side toggle
  PayedhandleChange(item: any) {
    this.checked = item.checked as boolean;
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
    this.incomeForm.reset();
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
  incomeUserList() {
    this.screenType = 1;

    this.incomeService.IncomeUserList(this.authSevice.getUserEmail())
      .subscribe((response: Array<IncomeModel>) => {
        this.incomeTableList = response;

      }
        , (error) => console.error(error), () => { })
  }
}
