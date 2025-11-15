import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ThemeSwitch } from '../theme-switch/theme-switch';
import { SidebarService } from '../../common/services/sidebar.service';
import { ImportsModule } from '../../imports';

@Component({
  selector: 'app-header',
  imports: [ButtonModule,ThemeSwitch,ImportsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  constructor(private sidebarService: SidebarService) {}

  onSidebarToggle() {
  this.sidebarService.toggle();
}
}
