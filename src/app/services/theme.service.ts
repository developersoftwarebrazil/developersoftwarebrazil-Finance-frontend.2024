import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  // Método para detectar o tema do sistema
  detectSystemTheme(): string {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDark) {
      return 'darkMode'; // Retorna 'dark' se o modo escuro estiver ativado
    } else {
      return ''; // Retorna 'light' se o modo claro estiver ativado
    }
  }
}
