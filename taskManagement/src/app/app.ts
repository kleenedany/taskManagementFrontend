import { Component, signal } from '@angular/core';
import { Header } from './components/skeleton/header/header';
import { Content } from './components/skeleton/content/content';

@Component({
  selector: 'app-root',
  imports: [Header, Content],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('taskManagement');
}
