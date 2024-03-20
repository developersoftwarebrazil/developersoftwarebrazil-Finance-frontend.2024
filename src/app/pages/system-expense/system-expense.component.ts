import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../services/menuservice';
import { Component, OnInit } from '@angular/core';
import { SelectModel } from '../../models/select.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ExpenseSystemService } from '../../services/expense.system.service';
import { ExpenseSystemModel } from '../../models/expense.system.model';

@Component({
  selector: 'system',
  templateUrl: './system-expense.component.html',
  styleUrl: './system-expense.component.scss'
})
export class SystemExpenseComponent {
  //variáveis
  systemForm: FormGroup;

  // checked = false;
  // generateExpenseCopy = 'accent';
  // disabled = false;

  systemList = new Array<SelectModel>();
  systemSelected = new SelectModel();

  constructor(
    private router: Router,
    public systemExpenseService: ExpenseSystemService,
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
    let item = new ExpenseSystemModel();
    item.Name = data["name"].value;

    item.Id = 0;
    item.Month = 0;
    item.MonthCopy = 0;
    item.DayMonthlyBookClose = 0;
    item.Year = 0;
    item.YearCopy = 0;
    item.GenerateExpensesCopy = true;



    // faz a chamada no backend
    this.systemExpenseService.AddSystemExpense(item)
      // se tudo ocorreu certo
      .subscribe((response: ExpenseSystemModel) => {
        this.systemForm.reset();

        this.systemExpenseService.RegisterUserOnSystemExpense(response.Id, "paulo@gmail.com")
          .subscribe((response: any) => {
            debugger
          }, (error) => console.error(error), () => { })
      }, (error) => console.error(error), () => { })
  }
}
