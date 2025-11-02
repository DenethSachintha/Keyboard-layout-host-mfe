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
  selector: 'theme-switcher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<div class="card flex justify-end p-2 mb-4">
  <ul class="flex list-none m-0 p-0 gap-2 items-center">
    <!-- Dark/Light Toggle Button -->
    <li>
      <button
        type="button"
        class="inline-flex w-8 h-8 p-0 items-center justify-center surface-0 dark:surface-800 border border-surface-200 dark:border-surface-600 rounded"
        (click)="onThemeToggler()"
      >
        <i [ngClass]="'pi ' + iconClass()" class="dark:text-white"></i>
      </button>
    </li>
  </ul>
</div>
`,
})
export class ThemeSwitcher {
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
