import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClass } from 'primeng/styleclass';
import { Component, OnDestroy } from '@angular/core';
import menuData from '../../../../public/menu.json';
import { SidebarService } from '../../common/sevices/sidebar.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [ButtonModule, Ripple, AvatarModule, CommonModule, StyleClass, RouterModule],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.scss',
})
export class SideMenu implements OnDestroy {
  visible = false;

  Workflow = menuData.Workflow;
  Training = menuData.Training;
  footer = menuData.footer;

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
