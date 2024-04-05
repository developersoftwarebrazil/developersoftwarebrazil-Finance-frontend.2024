import { MenuService } from '../../services/menuservice';
import { Component, OnInit } from '@angular/core';
import { SelectModel } from '../../models/select.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { CategoryIncomeModel } from '../../models/category-income.model';

import { IncomeSystemService } from '../../services/income.system.service';
import { IncomeSystemModel } from '../../models/income.system.model';
import { CategoryIncomeService } from '../../services/category-Income.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-income',
  templateUrl: './category-income.component.html',
  styleUrl: './category-income.component.scss'
})
export class CategoryIncomeComponent implements OnInit {
  //variáveis
  categoryIncomeForm: FormGroup;
  systemTheme: string;

  // Define qual tela será visualizada no sistema
  screenType = 1; // 1-listagem, 2-cadastro, 3-edição, 4-deletar

  //Cofigurações para a tabela de listagens
  categoryIncomeTableList: Array<CategoryIncomeModel>;
  id: string;
  page: number = 1;
  config: any;
  pagination: boolean = true;
  itemPerPages: number = 5;// indica a quantidade de itens exibidos por págin

  systemList = new Array<SelectModel>();

  systemIncomeSelected = new SelectModel();

  constructor(
    private themeService: ThemeService,
    public router: Router,
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public incomeSystemService: IncomeSystemService,
    public categoryIncomeService: CategoryIncomeService,
    public authSevice: AuthService
  ) { }

  ngOnInit(): void {

    this.menuService.menuSelected = 3.1;

    this.configPage();
    this.categoryIncomeUserList();

    this.categoryIncomeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      systemIncomeSelected: ['', [Validators.required]],
    });
    this.systemIncomeUserList();
  }

  // apllicção
  dataForm() {
    return this.categoryIncomeForm.controls;
  }

  // redireciona para a pagiá home do site
  goToHomePage() {
    this.router.navigate(['/dashboard']);
  }

  sendIncomeData() {
    var data = this.dataForm();

    if (this.editionItem) {

      this.editionItem.PropertyName ='';
      this.editionItem.Messages = '';
      this.editionItem.Notification =[];
      this.editionItem.Name = data["name"].value;
      this.editionItem.SystemIncomeId = parseInt(this.systemIncomeSelected.id);

      this.categoryIncomeService.UpdateCategoryIncome(this.editionItem)
        .subscribe((response: CategoryIncomeModel) => {
          this.categoryIncomeForm.reset();
          this.categoryIncomeUserList();

        }, (error) => console.error(error), () => { })

    } else {
      let itemIncome = new CategoryIncomeModel();

      itemIncome.Name = data["name"].value;
      itemIncome.Id = 0;
      itemIncome.SystemIncomeId = parseInt(this.systemIncomeSelected.id);


      this.categoryIncomeService.AddCategoryIncome(itemIncome)
        .subscribe((response: CategoryIncomeModel) => {
          this.categoryIncomeForm.reset();
          this.categoryIncomeUserList();

        }, (error) => console.error(error), () => { })
    }
  }
  editionItem: CategoryIncomeModel;
  edition(id: number) {
    this.categoryIncomeService.GetCategoryIncome(id)
      .subscribe((response: CategoryIncomeModel) => {
        if (response) {
          this.editionItem = response;
          this.screenType = 3;

          var incomeSystem = response;
          var data = this.dataForm();
          data["name"].setValue(this.editionItem.Name);

          this.systemIncomeUserList(response.SystemIncomeId)
        }
      }, (error) => console.error(error), () => { })
  }

  systemIncomeUserList(id: number = null) {

    this.incomeSystemService.SystemUserIncomeList(this.authSevice.getUserEmail())
      .subscribe((response: Array<IncomeSystemModel>) => {
        var systemIncomeList = [];

        response.forEach((r) => {
          var item = new SelectModel();
          item.id = r.Id.toString();
          item.name = r.Name

          systemIncomeList.push(item);

          if (id && id == r.Id) {
            this.systemIncomeSelected = item;
          }
        });
        this.systemList = systemIncomeList;
      })
  }

  //Configurações e métodos para a tabela

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
    this.categoryIncomeForm.reset();
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
  categoryIncomeUserList() {
    this.screenType = 1;

    this.categoryIncomeService.CategoryUserIncomeList(this.authSevice.getUserEmail())
      .subscribe((response: Array<CategoryIncomeModel>) => {
        this.categoryIncomeTableList = response;

      }
        , (error) => console.error(error), () => { })

  }
}
