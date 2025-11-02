import { Injectable } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/native-federation';

@Injectable({
  providedIn: 'root'
})
export class MicroFrontendService {
  constructor() { }
  async loadRemoteComponent(moduleName: string, port: number, remoteName:string) {
    try {
      console.log(`Loading remote module ${remoteName} from port ${port}`);
      return await loadRemoteModule({
        exposedModule: moduleName,
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
