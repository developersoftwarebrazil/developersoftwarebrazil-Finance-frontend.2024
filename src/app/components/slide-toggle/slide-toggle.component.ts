import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrl: './slide-toggle.component.scss'
})
export class SlideToggleComponent {
  @Input() title: string = "Slide Toggle";
  isChecked: boolean = false;
}
