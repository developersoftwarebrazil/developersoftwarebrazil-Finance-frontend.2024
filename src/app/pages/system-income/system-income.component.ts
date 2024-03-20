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

  // checked = false;
  // generateExpenseCopy = 'accent';
  // disabled = false;

  systemList = new Array<SelectModel>();
  systemSelected = new SelectModel();

  constructor(
    private router: Router,
    public systemIncomeService: IncomeSystemService,
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public authService: AuthService
  ) { }
  ngOnInit(): void {
    this.menuService.menuSelected = 2;

    this.systemForm = this.formBuilder.group
    ({
      name: ['', [Validators.required]],
      // month: ['', [Validators.required]],
      // monthCopy: ['', [Validators.required]],
      // dayMonthlyBookClose: ['', [Validators.required]],
      // year: ['', [Validators.required]],
      // yearCopy: ['', [Validators.required]],
    });
  }

  // apllicção
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
    this.systemIncomeService.AddSystemIncome(item)
      // se tudo ocorreu certo
      .subscribe((response: IncomeSystemModel) => {
        this.systemForm.reset();

        this.systemIncomeService.RegisterUserOnSystemIncome(response.Id, this.authService.getToken())
          .subscribe((response: any) => {
            debugger
          }, (error) => console.error(error), () => { })
      }, (error) => console.error(error), () => { })
  }
}
