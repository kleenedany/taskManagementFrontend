import { Component, signal } from '@angular/core';
import { Header } from './components/skeleton/header/header';
import { Footer } from './components/skeleton/footer/footer';
import { Content } from './components/skeleton/content/content';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, Content],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('taskManagement');
}
