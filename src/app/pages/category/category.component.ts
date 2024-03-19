
import { MenuService } from './../../services/menuservice';
import { Component, OnInit } from '@angular/core';
import { SelectModel } from '../../models/select.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseSystemService } from '../../services/expense.system.service';
import { ExpenseSystemModel } from '../../models/expense.system.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  //variáveis
  categoryForm: FormGroup;

  systemList = new Array<SelectModel>();
  systemSelected = new SelectModel();

  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public expenseSystem: ExpenseSystemService,
    public authSevice: AuthService
  ) { }
  ngOnInit(): void {
    this.menuService.menuSelected == 3;

    this.categoryForm = this.formBuilder.group({ name: ['', [Validators.required]] });
    this.listUserExpenseSystem();
  }

  // apllicção
  dataForm() {
    return this.categoryForm.controls;
  }
  sendData() {
    debugger
    var data = this.dataForm();
    alert(data['name'].value);
  }
  listUserExpenseSystem() {
    this.expenseSystem.SystemExpenseUserList(this.authSevice.getUserEmail())
      .subscribe((response: Array<ExpenseSystemModel>) => {
        var systemExpenseList = [];
        response.forEach(r => {
          var item = new SelectModel();

          item.Id = r.Id.toString();
          item.Name = r.Name.toString()

          systemExpenseList.push(item)
        })
        this.systemList = systemExpenseList;
      });
  }

}
