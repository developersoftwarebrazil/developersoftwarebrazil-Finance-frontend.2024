import { ETheme } from './../../../enums/EThemes.enum';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  public icon: string = ETheme.ICON_MOON;
  public textTheme = ETheme.ICON_MOON;

  constructor() { }

  ngOnInit(): void { }

  public toggleTheme() {
    const theme = document.body.classList.toggle('darkMode')
    if (theme) {
      return (
        this.textTheme = ETheme.TEXT_SUN,
        this.icon = ETheme.ICON_SUN
        );
    }


    return (
      this.textTheme = ETheme.TEXT_MOON,
      this.icon = ETheme.ICON_MOON
    );
  }

}
