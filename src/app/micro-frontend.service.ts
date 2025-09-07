import { Injectable } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/native-federation';

@Injectable({
  providedIn: 'root'
})
export class MicroFrontendService {
  constructor() { }
  async loadRemoteComponent(port: number, remoteName:string) {
    try {
      return await loadRemoteModule({
        exposedModule: './Component',
        remoteName:remoteName,
        remoteEntry: `http://localhost:${port}/remoteEntry.js`,
        fallback:'unauthorized'
      })
    } catch (error) {
      console.error(`Error Loading ${remoteName} component`, error);
      throw error;
    }
  }

}
