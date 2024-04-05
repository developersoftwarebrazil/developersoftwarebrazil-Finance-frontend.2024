import { MenuService } from '../../services/menuservice';
import { Component, OnInit } from '@angular/core';
import { SelectModel } from '../../models/select.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseSystemService } from '../../services/expense.system.service';
import { ExpenseSystemModel } from '../../models/expense.system.model';
import { AuthService } from '../../services/auth.service';
import { CategoryExpenseModel } from '../../models/category-expense.model';
import { CategoryExpenseService } from '../../services/category-expense.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-category-expense',
  templateUrl: './category-expense.component.html',
  styleUrl: './category-expense.component.scss'
})
export class CategoryExpenseComponent implements OnInit {
  //variáveis
  categoryExpenseForm: FormGroup;

  // Define qual tela será visualizada no sistema
  screenType = 1; // 1-listagem, 2-cadastro, 3-edição, 4-deletar

  //Cofigurações para a tabela de listagens
  categoryExpenseTableList: Array<CategoryExpenseModel>;
  id: string;
  page: number = 1;
  config: any;
  pagination: boolean = true;
  itemPerPages: number = 5;// indica a quantidade de itens exibidos por págin

  systemList = new Array<SelectModel>();
  systemExpenseSelected = new SelectModel();


  constructor(
    public router: Router,
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public expenseSystemService: ExpenseSystemService,
    public categoryExpenseService: CategoryExpenseService,
    public authSevice: AuthService
  ) { }

  ngOnInit(): void {

    this.menuService.menuSelected = 3;

    this.configPage();
    this.categoryExpenseUserList();
    this.categoryExpenseForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      systemExpenseSelected: ['', [Validators.required]],
    });
    this.systemExpenseUserList();
  }

  // métodos da apllicção
  dataForm() {
    return this.categoryExpenseForm.controls;
  }
  // redireciona para a pagiá home do site
  goToHomePage() {
    this.router.navigate(['/dashboard']);
  }
  sendExpenseData() {

    var data = this.dataForm();

    if (this.editionItem) {

      this.editionItem.PropertyName ='';
      this.editionItem.Messages = '';
      this.editionItem.Notification =[];

      this.editionItem.Name = data["name"].value;
      this.editionItem.SystemExpenseId = parseInt(this.systemExpenseSelected.id);

      this.categoryExpenseService.UpdateCategoryExpense(this.editionItem)
        .subscribe((response: CategoryExpenseModel) => {
          this.categoryExpenseForm.reset();
          this.categoryExpenseUserList();

        }, (error) => console.error(error), () => { })
    } else {
      let itemExpense = new CategoryExpenseModel();

      itemExpense.Id = 0;
      itemExpense.Name = data["name"].value;
      itemExpense.SystemExpenseId = parseInt(this.systemExpenseSelected.id);


      this.categoryExpenseService.AddCategoryExpense(itemExpense)
        .subscribe((response: CategoryExpenseModel) => {
          this.categoryExpenseForm.reset();
          this.categoryExpenseUserList();

        }, (error) => console.error(error), () => { })
    }
  }
  editionItem: CategoryExpenseModel;
  edition(id: number) {
    this.categoryExpenseService.GetCategoryExpense(id)
      .subscribe((response: CategoryExpenseModel) => {
        if (response) {
          this.editionItem = response;
          this.screenType = 3;

          var incomeSystem = response;
          var data = this.dataForm();
          data["name"].setValue(this.editionItem.Name);

          this.systemExpenseUserList(response.SystemExpenseId)
        }
      }, (error) => console.error(error), () => { })
  }

  systemExpenseUserList(id: number = null) {
    this.expenseSystemService.SystemExpenseUserList(this.authSevice.getUserEmail())
      .subscribe((response: Array<ExpenseSystemModel>) => {
        var systemExpenseList = [];

        response.forEach((r) => {
          var item = new SelectModel();
          item.id = r.Id.toString();
          item.name = r.Name

          systemExpenseList.push(item);
          if (id && id == r.Id) {
            this.systemExpenseSelected = item
          }
        });
        this.systemList = systemExpenseList;
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
    this.categoryExpenseForm.reset();
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
  categoryExpenseUserList() {
    this.screenType = 1;

    this.categoryExpenseService.CategoryUserExpenseList(this.authSevice.getUserEmail())
      .subscribe((response: Array<CategoryExpenseModel>) => {
        this.categoryExpenseTableList = response;

      }
        , (error) => console.error(error), () => { })

  }
}
