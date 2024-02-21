import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

 @Input() sidebarActive = true;
 @Output() toggleSidebar = new EventEmitter();

  constructor(){}

  ngOnInit(): void { }

}
