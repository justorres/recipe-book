import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() currentSelectedRoute = new EventEmitter<string>();

  switchTab(route:string) {
    this.currentSelectedRoute.emit(route);
  }

}
