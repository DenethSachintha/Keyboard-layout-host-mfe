import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Component,
  computed,
  effect,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { $t } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Material from '@primeuix/themes/material';
import Nora from '@primeuix/themes/nora';
import { PrimeNG } from 'primeng/config';

type PresetName = 'Aura' | 'Material' | 'Lara' | 'Nora';

const presets: Record<PresetName, any> = {
  Aura,
  Material,
  Lara,
  Nora,
};

export interface ThemeState {
  preset?: PresetName;
  primary?: string;
  surface?: string;
  darkTheme?: boolean;
}

@Component({
  selector: 'app-theme-switch',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './theme-switch.html',
  styleUrl: './theme-switch.scss'
})
export class ThemeSwitch {
  private readonly STORAGE_KEY = 'themeSwitcherState';
  document = inject(DOCUMENT);
  platformId = inject(PLATFORM_ID);
  config: PrimeNG = inject(PrimeNG);

  themeState = signal<ThemeState>({
    preset: 'Aura',
    primary: 'noir',
    surface: 'slate',
    darkTheme: false,
  });

  iconClass = computed(() => (this.themeState().darkTheme ? 'pi-sun' : 'pi-moon'));

  presets: PresetName[] = ['Aura', 'Material', 'Lara', 'Nora'];

  selectedPreset = computed(() => this.themeState().preset);
  selectedPrimaryColor = computed(() => this.themeState().primary);
  selectedSurfaceColor = computed(() => this.themeState().surface);

  transitionComplete = signal(false);

  constructor() {
    this.themeState.set({ ...this.loadThemeState() });

    effect(() => {
      const state = this.themeState();
      this.saveThemeState(state);
      this.handleDarkModeTransition(state);
    });
  }

  onThemeToggler() {
    this.themeState.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
  }

  loadThemeState(): ThemeState {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    }
    return { preset: 'Aura', primary: 'noir', surface: 'slate', darkTheme: false };
  }

  saveThemeState(state: ThemeState) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    }
  }

  handleDarkModeTransition(state: ThemeState) {
    if (!isPlatformBrowser(this.platformId)) return;

    if ((document as any).startViewTransition) {
      const transition = (document as any).startViewTransition(() => {
        this.toggleDarkMode(state);
      });
      transition.ready.then(() => this.transitionComplete.set(true));
    } else {
      this.toggleDarkMode(state);
    }
  }

  toggleDarkMode(state: ThemeState) {
    if (state.darkTheme) this.document.documentElement.classList.add('p-dark');
    else this.document.documentElement.classList.remove('p-dark');
  }

  onPresetChange(event: PresetName) {
    this.themeState.update((s) => ({ ...s, preset: event }));
    const preset = presets[event];
    $t().preset(preset).use({ useDefaultOptions: true });
  }
}
