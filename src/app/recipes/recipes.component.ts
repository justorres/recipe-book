import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrl: './recipes.component.scss',
    standalone: true,
    imports: [RecipeListComponent, RouterOutlet]
})
export class RecipesComponent implements OnInit {

  constructor() {
  }
  ngOnInit() {}
}
