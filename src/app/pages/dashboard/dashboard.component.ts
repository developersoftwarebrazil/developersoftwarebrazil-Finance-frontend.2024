import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../services/menuservice';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  @Input() sidebarActive = false;
  @Input() isSidebarActive = false;

  systemTheme: string;

  constructor(
    private themeService: ThemeService,
    public menuService: MenuService) { }
    
  ngOnInit(): void {
    this.systemTheme = this.themeService.detectSystemTheme();
    this.menuService.menuSelected = 1;
  }
}
