import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../../services/menuservice';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrl: './system.component.scss'
})
export class SystemComponent implements OnInit {
  @Input() sidebarActive = false;
  @Input() isSidebarActive = false;

  constructor(public menuService: MenuService) { }
  ngOnInit(): void {
    this.menuService.menuSelected = 2;
  }
}