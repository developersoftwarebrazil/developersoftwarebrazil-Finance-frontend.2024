import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  @Input() sidebarActive = false;
  @Input() isSidebarOpen = false;
 @Output() toggleSidebar = new EventEmitter();


 constructor(){}
  ngOnInit(): void {}

  toggleSidebarOpen() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
