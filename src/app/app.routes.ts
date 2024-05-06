import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.routes').then((m) => m.routes)
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.routes').then((m) => m.routes)
  },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: '/recipes' }
];
