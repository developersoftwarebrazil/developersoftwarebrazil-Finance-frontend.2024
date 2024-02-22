import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../services/menuservice';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent implements OnInit {
  @Input() sidebarActive = false;
  @Input() isSidebarActive = false;

  constructor(public menuService: MenuService) { }
  ngOnInit(): void {
    this.menuService.menuSelected = 4;
  }
}
