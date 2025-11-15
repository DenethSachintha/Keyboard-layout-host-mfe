import { loadRemoteModule } from '@angular-architects/native-federation';

export async function loadRemoteRoutesWithStyle(
  port: number,
  remoteName: string,
  exposedModule: string
) {
  // 1️⃣ load CSS once
  const styleId = `style-${remoteName}`;
  if (!document.getElementById(styleId)) {
    const link = document.createElement('link');
    link.id = styleId;
    link.rel = 'stylesheet';
    link.href = `http://localhost:${port}/styles.css`;
    document.head.appendChild(link);
  }

  // 2️⃣ then load routes
  return loadRemoteModule({
    remoteEntry: `http://localhost:${port}/remoteEntry.js`,
    remoteName,
    exposedModule,
  });
}
