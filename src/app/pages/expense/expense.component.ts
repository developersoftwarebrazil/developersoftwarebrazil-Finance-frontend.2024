import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../services/menuservice';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent implements OnInit {
  //variáveis
  @Input() sidebarActive = false;
  @Input() isSidebarActive = false;
  systemForm: FormGroup;

  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.menuService.menuSelected = 4;

    this.systemForm = this.formBuilder.group({name:['',[Validators.name]]})
  }

  // apllicção
  dataForm() {
    return this.systemForm.controls;
  }
  sendData() {
    debugger
    var data = this.dataForm();
    alert(data['name'].value);
  }
}
