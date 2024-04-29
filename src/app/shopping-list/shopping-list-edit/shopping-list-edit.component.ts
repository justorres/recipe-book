import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.scss'
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  addIngredientToList(nameInput: HTMLInputElement, amountInput: HTMLInputElement) {
      this.shoppingListService.addIngredient({
        name: this.nameInput.nativeElement.value,
        amount: +this.amountInput.nativeElement.value
      });

    //use the parameter method
    this.deleteInputData(nameInput, amountInput);
  }

  deleteInputData(nameInput: HTMLInputElement, amountInput: HTMLInputElement) {
    nameInput.value = '';
    amountInput.value = '';
  }
}
