import { Component, Input } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { ShoppingListService } from '../../shopping-list/services/shopping-list.service';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) {
  }

  addToShoppingList() {
    if(this.recipe.ingredients.length > 0) {
      this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
    }
  }

}
