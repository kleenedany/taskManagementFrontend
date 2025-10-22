import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { ProjectDto } from '../../../../api/model';
import { ProjectComponent } from '../project-component/project-component';
import { TaskComponent } from '../../task/task-component/task-component';

@Component({
  selector: 'app-project',
  imports: [MatSidenavModule, ProjectComponent, TaskComponent, CommonModule],
  templateUrl: './project-page-container.html',
  styleUrl: './project-page-container.scss'
})
export class ProjectPageContainer {
  public selectedProjectSubject = new BehaviorSubject<ProjectDto | null>(null);
  public selectedProject$ = this.selectedProjectSubject.asObservable();


  public showTasks(project: ProjectDto) {
    this.selectedProjectSubject.next(project);
  }

}


