import { Routes } from '@angular/router';
import { Remotes } from './remotes';

export const RemotesRoutes: Routes = [
  {
    path: '',
    redirectTo: 'generator',       
    pathMatch: 'full',
  },
  {
    path: 'generator',
    component: Remotes,
    data: {
      title: 'Layout Generator Page',
      RemoteComponent: [
        { 
            Port: '4201', 
            Name: 'Keyboard-layout-generator-mfe',
            Module: './Component' 
        },
      ],
    },
  },
  {
    path: 'guide',
    component: Remotes,
    data: {
      title: 'Layout guide Page',
      RemoteComponent: [
        { 
            Port: '4202', 
            Name: 'Keyboard-layout-guide-mfe',
            Module: './Component'
        },
      ],
    },
  },
];
