import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../services/menuservice';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent implements OnInit {
  @Input() sidebarActive = false;
  @Input() isSidebarActive = false;

  constructor(public menuService: MenuService) { }
  ngOnInit(): void {
    this.menuService.menuSelected = 5;
  }
}
