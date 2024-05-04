import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../../recipes/services/recipe.service';
import { Recipe } from '../models/recipe.model';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  apiUrl =
    'https://course-recipe-book-2-default-rtdb.asia-southeast1.firebasedatabase.app/';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length > 0) {
      this.http
        .put(`${this.apiUrl}/recipes.json`, recipes)
        .subscribe((response) => {
          console.log(response);
        });
    }
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(`${this.apiUrl}/recipes.json`)
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.loadRecipes(recipes);

        })
      )
  }
}
