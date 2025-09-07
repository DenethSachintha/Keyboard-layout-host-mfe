import { Component, ComponentRef, OnDestroy, OnInit, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MicroFrontendService } from './micro-frontend.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit,  OnDestroy {
  protected readonly title = signal('Keyboard-layout-host-mfe');

  @ViewChild('generator', { read:ViewContainerRef , static: true }) generatorContainer!: ViewContainerRef;
  private generatorContainerRef : ComponentRef<any> | null = null;
   constructor(private microFrontendService :MicroFrontendService) {}


   async ngOnInit() {
     try {
       const  Generatormodule  = await this.microFrontendService.loadRemoteComponent(4201,'Keyboard-layout-generator-mfe');
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
