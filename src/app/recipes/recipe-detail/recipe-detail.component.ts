import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { DropdownDirective } from '../../shared/directives/dropdown.directive';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrl: './recipe-detail.component.scss',
    standalone: true,
    imports: [DropdownDirective, NgFor]
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.id = +param['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  addToShoppingList() {
    if (this.recipe.ingredients.length > 0) {
      this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
    }
  }

  editRecipe() {
    void this.router.navigate(['edit'], { relativeTo: this.route });
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    void this.router.navigate(['../'], {relativeTo: this.route});
  }
}
