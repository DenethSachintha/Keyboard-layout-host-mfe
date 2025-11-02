import { Component, ViewChild } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClass } from 'primeng/styleclass';
import { Drawer } from 'primeng/drawer';

@Component({
  selector: 'app-side-menu',
  imports: [DrawerModule, ButtonModule, Ripple, AvatarModule, StyleClass],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.scss'
})
export class SideMenu {
    @ViewChild('drawerRef') drawerRef!: Drawer;

    closeCallback(e: Event): void {
        this.drawerRef.close(e);
    }

    visible: boolean = false;
}
