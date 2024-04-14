import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ExpenseService } from '../../services/expense.service';
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

  objectToExpenseGraph: any;
  objectToIncomeGraph: any;

  systemTheme: string;

  constructor(
    private themeService: ThemeService,
    public menuService: MenuService,
    public expenseService: ExpenseService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.systemTheme = this.themeService.detectSystemTheme();
    this.menuService.menuSelected = 1;
    this.loadExpenseGraph();
  }

  loadExpenseGraph() {
    this.expenseService.LoadExpenseGraph(this.authService.getUserEmail())
      .subscribe((response: any) => {
        debugger
        this.objectToExpenseGraph = response;
        console.log(response);
      }, (error) => console.error(error), () => { })
  }
}
