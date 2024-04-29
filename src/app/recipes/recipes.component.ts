import { Component, OnInit } from '@angular/core';
import { Recipe } from '../shared/models/recipe.model';
import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(public recipeService: RecipeService) {
  }
  ngOnInit() {
    this.recipeService.recipeSelected.subscribe((recipe) => {
      this.selectedRecipe = recipe;
    })
  }
}
