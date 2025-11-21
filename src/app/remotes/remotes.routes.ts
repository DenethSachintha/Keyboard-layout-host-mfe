import { Routes } from '@angular/router';
import { Remotes } from './remotes';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { loadRemoteRoutesWithStyle } from '../common/sevices/load-remote-routes.service';

export const RemotesRoutes: Routes = [
  {
    path: '',
    redirectTo: 'generator',
    pathMatch: 'full',
  },
  /* {
    path: 'generator',
    component: Remotes,
    data: {
      title: 'Layout Generator Page',
      RemoteComponent: [
        {
          Port: '4201',
          Name: 'Keyboard-layout-generator-mfe',
          Module: './Component',
        },
      ],
    },
  }, */
  {
    path: 'workflow',
    loadChildren: () =>
      loadRemoteRoutesWithStyle(4201, 'Keyboard-layout-generator-mfe', './Routes')
        .then(m => m.routes),
  },
  {
    path: 'training',
    loadChildren: () =>
      loadRemoteRoutesWithStyle(4202, 'Keyboard-layout-guide-mfe', './Routes')
        .then(m => m.routes),
  },
  /*{
    path: 'guide',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        remoteName: 'Keyboard-layout-guide-mfe',
        exposedModule: './Routes',
      }).then((m) => m.routes),
  },*/
  /*{
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
  },*/
];
