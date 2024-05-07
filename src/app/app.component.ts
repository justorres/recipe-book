import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainService } from './shared/services/main.service';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { NgIf } from '@angular/common';
import { Meta } from '@angular/platform-browser';

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
    private authService: AuthService,
    private meta: Meta
  ) {}

  ngOnInit() {
    //this is only sample meta tags
    this.meta.addTags([
      // Basic Meta Tags
      { name: 'description', content: 'Discover new recipes, create shopping lists, and manage your cooking effortlessly with Recipe Book.' },
      { name: 'keywords', content: 'recipes, cooking, shopping list, food, kitchen, recipe book, easy cooking' },
      { name: 'author', content: 'Recipe Book Team' },

      // Open Graph Meta Tags
      { property: 'og:title', content: 'Recipe Book - Your Ultimate Cooking Companion' },
      { property: 'og:description', content: 'Discover new recipes, create shopping lists, and manage your cooking effortlessly with Recipe Book.' },
      { property: 'og:image', content: 'https://yourwebsite.com/assets/og-image.jpg' },
      { property: 'og:url', content: 'https://yourwebsite.com' },
      { property: 'og:type', content: 'website' },

      // Twitter Card Meta Tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Recipe Book - Your Ultimate Cooking Companion' },
      { name: 'twitter:description', content: 'Discover new recipes, create shopping lists, and manage your cooking effortlessly with Recipe Book.' },
      { name: 'twitter:image', content: 'https://yourwebsite.com/assets/twitter-card.jpg' },
      { name: 'twitter:site', content: '@recipebook' },
      { name: 'twitter:creator', content: '@recipebook_team' }
    ]);


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
