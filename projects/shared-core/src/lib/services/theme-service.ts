import { Injectable, signal } from '@angular/core';

export type Theme =
  | 'light'
  | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  readonly theme = signal<Theme>('light');

  init(): void {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    this.setTheme(savedTheme ?? 'light');
  }

  setTheme(theme: Theme): void {
    document.body.dataset['theme'] = theme;
    localStorage.setItem('theme', theme);
    this.theme.set(theme);
  }

  toggleTheme(): void {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}