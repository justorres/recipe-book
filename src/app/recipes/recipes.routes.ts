import {  Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { authGuard } from '../shared/guards/auth.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { recipeResolver } from '../shared/resolvers/recipe.resolver';

export const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: RecipeStartComponent, pathMatch: 'full' },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: { data: recipeResolver }
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: { data: recipeResolver }
      }
    ]
  }
];
