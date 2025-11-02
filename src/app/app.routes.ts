import { Routes } from '@angular/router';

import { CommonLayout } from './layouts/common-layout/common-layout';
import { NotFound } from './common/components/not-found/not-found';
import { Home } from './layouts/home/home';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',       
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: CommonLayout,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./remotes/remotes.routes').then((m) => m.RemotesRoutes),
      },
    ],
  },
  {
    path: '**',
    component: NotFound
  },
];
