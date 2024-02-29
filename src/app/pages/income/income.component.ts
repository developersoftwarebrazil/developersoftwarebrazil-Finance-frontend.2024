import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../services/menuservice';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent implements OnInit {
  //variáveis
  @Input() sidebarActive = false;
  @Input() isSidebarActive = false;
  systemForm: FormGroup;

  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.menuService.menuSelected = 5;
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
