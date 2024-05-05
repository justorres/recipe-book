import { Injectable } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { Ingredient } from '../../shared/models/ingredients.model';
import { ShoppingListService } from '../../shopping-list/services/shopping-list.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [];
  recipeChanged$ = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {}

  loadRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged$.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredient(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged$.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged$.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged$.next(this.recipes.slice());
  }
}
