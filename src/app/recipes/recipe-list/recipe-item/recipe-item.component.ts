import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../shared/models/recipe.model';
import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './recipe-item.component.html',
    styleUrl: './recipe-item.component.scss',
    standalone: true,
    imports: [RouterLinkActive, RouterLink]
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;

  ngOnInit() {}
}
