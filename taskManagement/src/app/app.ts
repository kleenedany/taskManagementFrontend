import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Project } from './project/project';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Project],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('taskManagement');
}
