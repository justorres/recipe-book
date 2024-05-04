import { MaybeAsync, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { DataStorageService } from '../services/data-storage.service';
import { RecipeService } from '../../recipes/services/recipe.service';

export const recipeResolver: ResolveFn<Recipe> = (
  route,
  state
): MaybeAsync<any> => {
  const dataStorageService = inject(DataStorageService);
  const recipeService = inject(RecipeService);
  const id = +route.params['id'];
  console.log(recipeService.getRecipes());
  if(recipeService.getRecipes().length === 0) {
    return dataStorageService.fetchRecipes();
  } else {
    return recipeService.getRecipes();
  }
};
