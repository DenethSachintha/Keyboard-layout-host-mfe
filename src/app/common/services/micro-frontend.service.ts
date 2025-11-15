import { Injectable } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/native-federation';

@Injectable({
  providedIn: 'root'
})
export class MicroFrontendService {
  constructor() { }
  async loadRemoteComponent(moduleName: string, port: number, remoteName: string) {
  try {
    console.log(`Loading remote module ${remoteName} from port ${port}`);

    // dynamically load remoteEntry.js
    const remoteModule = await loadRemoteModule({
      exposedModule: moduleName,
      remoteName,
      remoteEntry: `http://localhost:${port}/remoteEntry.js`,
      fallback: 'unauthorized'
    });

    // ✅ Load the remote's CSS dynamically
    const styleId = `style-${remoteName}`;
    if (!document.getElementById(styleId)) {
      const link = document.createElement('link');
      link.id = styleId;
      link.rel = 'stylesheet';
      link.href = `http://localhost:${port}/styles.css`; // Adjust if your CSS path differs
      document.head.appendChild(link);
    }

    return remoteModule;
  } catch (error) {
    console.error(`Error Loading ${remoteName} component`, error);
    throw error;
  }
}


}
