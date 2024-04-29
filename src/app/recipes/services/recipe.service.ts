import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { Ingredient } from '../../shared/models/ingredients.model';
import { ShoppingListService } from '../../shopping-list/services/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    {
      name: 'Spaghetti',
      description: 'A Spaghetti',
      imagePath:
        'https://i.pinimg.com/736x/6d/be/b3/6dbeb33a6016400d13a0303952ec6306.jpg',
      ingredients: [
        {
          name: 'Meat',
          amount: 1
        },
        {
          name: 'French fries',
          amount: 20
        }
      ]
    },
    {
      name: 'Lasagna',
      description: 'A Lasagna',
      imagePath:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbhmd8j0Z4gewdoV05ABghqBkIRvhdBWm0bRPKFnNEQA&s',
      ingredients: [
        {
          name: 'Buns',
          amount: 2
        },
        {
          name: 'Meat',
          amount: 1
        }
      ]
    }
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredient(ingredients);
  }
}
