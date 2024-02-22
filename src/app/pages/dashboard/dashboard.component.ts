import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../services/menuservice';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  @Input() sidebarActive = false;
  @Input() isSidebarActive = false;

  constructor(public menuService: MenuService) { }
  ngOnInit(): void {
    this.menuService.menuSelected = 1;
  }
}
