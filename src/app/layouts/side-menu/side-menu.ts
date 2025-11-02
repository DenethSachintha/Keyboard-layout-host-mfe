/* import { Component, ViewChild } from '@angular/core'; import { DrawerModule } from 'primeng/drawer'; import { ButtonModule } from 'primeng/button'; import { Ripple } from 'primeng/ripple'; import { AvatarModule } from 'primeng/avatar'; import { StyleClass } from 'primeng/styleclass'; import { Drawer } from 'primeng/drawer'; import { SidebarService } from '../../common/sevices/sidebar.service'; import { Subscription } from 'rxjs'; @Component({ selector: 'app-side-menu', imports: [DrawerModule, ButtonModule, Ripple, AvatarModule, StyleClass], templateUrl: './side-menu.html', styleUrl: './side-menu.scss' }) export class SideMenu { @ViewChild('drawerRef') drawerRef!: Drawer; visible: boolean = false; private sub: Subscription; constructor(private sidebarService: SidebarService) { this.sub = this.sidebarService.visible$.subscribe((val) => { this.visible = val; }); } closeCallback(e: Event): void { this.drawerRef.close(e); this.sidebarService.close(); } ngOnDestroy() { this.sub.unsubscribe(); } } */

import { Component, OnDestroy } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClass } from 'primeng/styleclass';
import { SidebarService } from '../../common/sevices/sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [ButtonModule, Ripple, AvatarModule, StyleClass],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.scss',
})
export class SideMenu implements OnDestroy {
  visible = false;
  private sub: Subscription;

  constructor(private sidebarService: SidebarService) {
    this.sub = this.sidebarService.visible$.subscribe((v) => (this.visible = v));
  }

  closeSidebar() {
    this.sidebarService.close();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}