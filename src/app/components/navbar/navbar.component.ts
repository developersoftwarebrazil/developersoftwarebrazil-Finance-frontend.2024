import { ETheme } from '../../../enums/EThemes.enum';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  public icon: string = ETheme.ICON_MOON;
  public textTheme = ETheme.ICON_MOON;

  constructor() { }

  ngOnInit(): void {

    this.toggleNavTheme();
  }

  public toggleNavTheme() {
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
