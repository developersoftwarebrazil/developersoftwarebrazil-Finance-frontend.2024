import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/account/login/login.component';
import { AuthGuard } from './pages/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: '', component: LoginComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'system-expense',
    loadChildren: () => import('./pages/system-expense/system-expense.module').then(m => m.SystemExpenseModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'system-income',
    loadChildren: () => import('./pages/system-income/system-income.module').then(m => m.SystemIncomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'category-expense',
    loadChildren: () => import('./pages/category-expense/category-expense.module').then(m => m.CategoryExpenseModule),
    canActivate: [AuthGuard]
  }, ,
  {
    path: 'category-income',
    loadChildren: () => import('./pages/category-income/category.module').then(m => m.CategoryIncomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'incomes',
    loadChildren: () => import('./pages/incomes/income.module').then(m => m.IncomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'expenses',
    loadChildren: () => import('./pages/expenses/expense.module').then(m => m.ExpenseModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
