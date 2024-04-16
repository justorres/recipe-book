import { Component } from '@angular/core';
import {Recipe} from '../../shared/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    {
      name: 'A Test Recipe',
      description: 'This is simply a test',
      imagePath: 'https://i.pinimg.com/736x/6d/be/b3/6dbeb33a6016400d13a0303952ec6306.jpg'
    },
    {
      name: 'A Test Recipe',
      description: 'This is simply a test',
      imagePath: 'https://i.pinimg.com/736x/6d/be/b3/6dbeb33a6016400d13a0303952ec6306.jpg'
    }
  ];

}
