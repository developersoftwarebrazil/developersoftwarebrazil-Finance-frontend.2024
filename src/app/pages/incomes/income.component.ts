import { MenuService } from '../../services/menuservice';
import { Component, OnInit } from '@angular/core';
import { SelectModel } from '../../models/select.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { IncomeSystemService } from '../../services/ncome.system.service';
import { CategoryIncomeService } from '../../services/category-Income.service';
import { CategoryIncomeModel } from '../../models/category-income.model';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent implements OnInit {
  //variáveis
  incomeForm: FormGroup;
  // systemList = new Array<SelectModel>();
  // systemSelected = new SelectModel();

  categoryIncomeList = new Array<SelectModel>();
  categoryIncomeSelected = new SelectModel();

  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public incomeSystemService: IncomeSystemService,
    public categoryIncomeService: CategoryIncomeService,
    public authSevice: AuthService
  ) { }
  ngOnInit(): void {
    this.menuService.menuSelected = 4;

    this.incomeForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        value: ['', [Validators.required]],
        data: ['', [Validators.required]],
        systemIncomeSelect: ['', [Validators.required]],
        categoryInccomeSelect: ['', [Validators.required]],

      });
      this.categoryUserIncomeList();
  }

  // apllicção
  dataForm() {
    return this.incomeForm.controls;
  }
  sendData() {
    debugger
    var data = this.dataForm();
    alert(data['name'].value);
  }

  categoryUserIncomeList(){
    this.categoryIncomeService.CategoryUserIncomeList(this.authSevice.getUserEmail())
      .subscribe((response: Array<CategoryIncomeModel>)=>{
        var categoryIncomeList = [];
        response.forEach((r)=>{
          var item = new SelectModel();
          item.id = r.Id.toString();
          item.name = r.Name;

          categoryIncomeList.push(item)
        });
        this.categoryIncomeList = categoryIncomeList;
      })
  }
}
