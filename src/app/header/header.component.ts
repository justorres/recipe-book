import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/services/data-storage.service';
import { AuthService } from '../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private authUserSub$: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authUserSub$ = this.authService.user.subscribe((user) => {
        this.isAuthenticated = !!user;
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.isAuthenticated = false;
    this.authService.logoutUser();
  }

  ngOnDestroy() {
    this.authUserSub$.unsubscribe();
  }
}
