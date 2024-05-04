import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/models/ingredients.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.scss'
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('ingredientForm', { static: true }) ingredientForm: NgForm;
  currentIngredients: Ingredient[];
  editSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.currentIngredients = this.shoppingListService.getIngredients();
    this.editSubscription = this.shoppingListService.startedEditing.subscribe(
      (index) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.ingredientForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onAddIngredient() {
    if (this.ingredientForm.valid) {
      const data = {
        name: this.ingredientForm.value.name,
        amount: +this.ingredientForm.value.amount
      };
      if (this.editMode) {
        this.shoppingListService.updateIngredient(this.editedItemIndex, data);
      } else {
        this.shoppingListService.addIngredient(data);
      }
      this.onClearIngredientForm();
    }
  }

  onDeleteIngredient() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClearIngredientForm();
  }

  onClearIngredientForm() {
    this.editMode = false;
    this.editedItemIndex = -1;
    this.editedItem = undefined;
    this.ingredientForm.reset();
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
  }
}
