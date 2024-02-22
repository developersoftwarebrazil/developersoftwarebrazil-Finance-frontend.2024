import { MenuService } from './../../services/menuservice';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {

  constructor(public menuService: MenuService){}
  ngOnInit(): void {
    this.menuService.menuSelected == 3;
  }

}
