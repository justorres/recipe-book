import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  currentRoute = 'recipes';

  changeTab(route: string) {
    this.currentRoute = route;
  }
}
