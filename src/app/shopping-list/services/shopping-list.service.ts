import { Injectable } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredients.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
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
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  checkDuplicateIngredient(ingredient: Ingredient) {
    let hasIngredient = this.ingredients.find(item => item.name === ingredient.name);
    if(hasIngredient) {
      hasIngredient.amount += ingredient.amount;
    } else {
      this.ingredients.push({...ingredient});
    }
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }
}
