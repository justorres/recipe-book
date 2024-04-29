import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredients: Ingredient[] = [
    { name: 'Apples', amount: 5 },
    { name: 'Tomatoes', amount: 10 }
  ];

  constructor() {}

  addIngredient(ingredientData: Ingredient | Ingredient[]) {
    if (Array.isArray(ingredientData)) {
      ingredientData.forEach(ingredient => {
        this.checkDuplicateIngredient(ingredient);
      })
    } else {
      this.checkDuplicateIngredient(ingredientData);
    }
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  checkDuplicateIngredient(ingredient: Ingredient) {
    let hasIngredient = this.ingredients.find(item => item.name === ingredient.name);
    if(hasIngredient) {
      hasIngredient.amount += ingredient.amount;
    } else {
      this.ingredients.push({...ingredient});
    }
  }

  getIngredients() {
    return this.ingredients.slice();
  }
}
