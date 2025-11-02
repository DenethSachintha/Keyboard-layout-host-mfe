import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenu } from '../side-menu/side-menu';
import { ButtonModule } from 'primeng/button';
import { ThemeSwitcher } from '../themeswitcher';

@Component({
  selector: 'app-common-layout',
  imports: [RouterOutlet,SideMenu,ButtonModule,ThemeSwitcher],
  templateUrl: './common-layout.html',
  styleUrl: './common-layout.scss'
})
export class CommonLayout {

}
