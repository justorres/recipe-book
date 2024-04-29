import { Ingredient } from './ingredients.model';

export interface Recipe {
  name: string;
  description: string;
  imagePath: string;
  ingredients: Ingredient[];
}
