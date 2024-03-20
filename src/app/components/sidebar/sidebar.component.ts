import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menuservice';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  @Input() sidebarActive = false;
  @Input() isSidebarOpen = false;
  @Output() toggleSidebar = new EventEmitter();


  constructor(
    private router: Router,
    public menuService: MenuService
  ) { }
  ngOnInit(): void { }

  //método para abrir e fechar o sidebar
  toggleSidebarOpen() {
    this.isSidebarOpen = !this.isSidebarOpen;
    if (!this.isSidebarOpen) {
      const openSidebar = document.body.classList.remove('open-sidebar');

    } else {
      const openSidebar = document.body.classList.toggle('open-sidebar');
    }

  }


  menuSelect(menu: number) {
    switch (menu) {
      case 1:
        this.router.navigate(['/dashboard']);
        break;

      case 2:
        this.router.navigate(['/system-expense']);
        break;
      case 2.1:
        this.router.navigate(['/system-income']);
        break;

      case 3:
        this.router.navigate(['/category']);
        break;

      case 4:
        this.router.navigate(['/expense']);
        break;
      case 5:
        this.router.navigate(['/income']);
        break;
      case 6:
        this.router.navigate(['/user']);
        break;

      case 100:
        localStorage.clear();
        this.router.navigate(['/login']);
        break;

      default:
        break;
    }
    // guarda o nome da variável escolhida no menu
    this.menuService.menuSelected = menu;
  }

}
