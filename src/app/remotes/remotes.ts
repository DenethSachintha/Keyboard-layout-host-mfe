import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MicroFrontendService } from '../common/sevices/micro-frontend.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-remotes',
  imports: [],
  templateUrl: './remotes.html',
  styleUrl: './remotes.scss'
})
export class Remotes {
  @ViewChild('container', { read:ViewContainerRef , static: true }) generatorContainer!: ViewContainerRef;
  private generatorContainerRef : ComponentRef<any> | null = null;
   constructor(private microFrontendService :MicroFrontendService,     private route: ActivatedRoute,
) {}

   async ngOnInit() {
     try {
            // 👇 get route data (from routes configuration)
      const remoteData = this.route.snapshot.data['RemoteComponent']?.[0];
      if (!remoteData) throw new Error('Remote component data missing in route');

       const { Module, Port, Name } = remoteData;

       const  Generatormodule  = await this.microFrontendService.loadRemoteComponent(Module, Port,Name);
       this.generatorContainer.clear();
       this.generatorContainerRef = this.generatorContainer.createComponent(Generatormodule.App);
       this.generatorContainerRef.changeDetectorRef.detectChanges();
     } catch (error) {
       console.error('Error loading remote component', error);
     }
    }

    ngOnDestroy(): void {
      if (this.generatorContainerRef) {
        this.generatorContainerRef.destroy();
        this.generatorContainerRef = null;
      } 
    }
}
