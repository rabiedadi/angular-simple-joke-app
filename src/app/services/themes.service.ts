import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {
  activeTheme: boolean;
  constructor() {
    const theme = localStorage.getItem('theme') || 'light';
    this.activeTheme = theme === 'light' ? false : true;
    document.documentElement.setAttribute('theme', theme);
  }

  toggleTheme() {
    const theme = !this.activeTheme ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    document.documentElement.classList.add('color-theme-in-transition');
    document.documentElement.setAttribute('theme', theme);
    window.setTimeout(_ => {
      document.documentElement.classList.remove('color-theme-in-transition');
    }, 1000);
  }
}
