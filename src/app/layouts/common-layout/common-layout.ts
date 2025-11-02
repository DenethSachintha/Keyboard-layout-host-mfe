import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenu } from '../side-menu/side-menu';
import { ButtonModule } from 'primeng/button';
import { Header } from '../header/header';
import { SidebarService } from '../../common/sevices/sidebar.service';

@Component({
  selector: 'app-common-layout',
  imports: [RouterOutlet,SideMenu,ButtonModule,Header],
  templateUrl: './common-layout.html',
  styleUrl: './common-layout.scss'
})
export class CommonLayout {
  sidebarVisible = false;

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.visible$.subscribe((val) => {
      this.sidebarVisible = val;
    });
  }
}
