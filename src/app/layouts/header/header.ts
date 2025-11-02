import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ThemeSwitch } from '../theme-switch/theme-switch';
import { SidebarService } from '../../common/sevices/sidebar.service';

@Component({
  selector: 'app-header',
  imports: [ButtonModule,ThemeSwitch],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  constructor(private sidebarService: SidebarService) {}

  onSidebarToggle() {
  this.sidebarService.toggle();
}
}
