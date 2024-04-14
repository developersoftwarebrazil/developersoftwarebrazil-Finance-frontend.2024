import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ExpenseService } from '../../services/expense.service';
import { IncomeService } from '../../services/income.service';
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
    public incomeService: IncomeService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.systemTheme = this.themeService.detectSystemTheme();
    this.menuService.menuSelected = 1;
    this.loadExpenseGraph();
    this.loadIncomeGraph();
  }

  loadExpenseGraph() {
    this.expenseService.LoadExpenseGraph(this.authService.getUserEmail())
      .subscribe((responseExpense: any) => {
        debugger
        this.objectToExpenseGraph = responseExpense;
        console.log(responseExpense);
      }, (error) => console.error(error), () => { })
  }
  loadIncomeGraph() {
    this.incomeService.LoadIncomeGraph(this.authService.getUserEmail())
      .subscribe((responseIncome: any) => {
        debugger
        this.objectToIncomeGraph = responseIncome;
      }, (error) => console.error(error), () => { })
  }
}
