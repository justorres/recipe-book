import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainService } from './shared/services/main.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  currentRoute = 'recipes';
  isLoading = false;
  loadingSub$: Subscription;

  constructor(private mainService: MainService) {}

  ngOnInit() {
    this.loadingSub$ = this.mainService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
      if(!isLoading) {
      document.querySelector('.backdrop').classList.remove('show');
      } else {
        document.querySelector('.backdrop').classList.add('show');
      }
    });
  }

  changeTab(route: string) {
    this.currentRoute = route;
  }

  ngOnDestroy() {
    this.loadingSub$.unsubscribe();
  }
}
