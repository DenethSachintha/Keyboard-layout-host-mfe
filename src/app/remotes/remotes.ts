import { Component, ComponentRef, EnvironmentInjector, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MicroFrontendService } from '../common/sevices/micro-frontend.service';

@Component({
  selector: 'app-remotes',
  standalone: true, // optional but cleaner if no module
  templateUrl: './remotes.html',
  styleUrls: ['./remotes.scss']
})
export class Remotes {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  private container!: ViewContainerRef;

  private remoteRef: ComponentRef<any> | null = null;

  constructor(
    private microFrontendService: MicroFrontendService,
    private route: ActivatedRoute,
    private environmentInjector: EnvironmentInjector // ✅ needed for DI in remotes
  ) {}

  async ngOnInit() {
    try {
      // 👇 get route data
      const remoteData = this.route.snapshot.data['RemoteComponent']?.[0];
      if (!remoteData) throw new Error('Remote component data missing in route');

      const { Module, Port, Name } = remoteData;

      // 👇 load the exposed module
      const remoteModule = await this.microFrontendService.loadRemoteComponent(Module, Port, Name);
      const componentToRender = remoteModule.Component || remoteModule.App;

      if (!componentToRender) {
        throw new Error(`Remote module ${Name} did not export Component/App`);
      }

      // 👇 clear and create with proper injector
      this.container.clear();
      this.remoteRef = this.container.createComponent(componentToRender, {
        environmentInjector: this.environmentInjector, // ✅ fixes NG0203
      });

      this.remoteRef.changeDetectorRef.detectChanges();
    } catch (error) {
      console.error('Error loading remote component:', error);
    }
  }

  ngOnDestroy() {
    if (this.remoteRef) {
      this.remoteRef.destroy();
      this.remoteRef = null;
    }
  }
}
