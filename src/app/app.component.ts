import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainService } from './shared/services/main.service';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, LoadingSpinnerComponent, NgIf],
  standalone: true
})
export class AppComponent implements OnInit, OnDestroy {
  currentRoute = 'recipes';
  isLoading = false;
  loadingSub$: Subscription;

  constructor(
    private mainService: MainService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.loadingSub$ = this.mainService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  changeTab(route: string) {
    this.currentRoute = route;
  }

  ngOnDestroy() {
    this.loadingSub$.unsubscribe();
  }
}
