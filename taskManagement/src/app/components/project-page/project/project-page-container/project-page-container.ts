import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ProjectControllerService } from '../../../../api/project-controller/project-controller.service.gen';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { ProjectPO } from '../../../../api/model';
import { ProjectComponent } from '../project-component/project-component';
import { TaskComponent } from '../../task/task-component/task-component';

@Component({
  selector: 'app-project',
  imports: [MatSidenavModule, ProjectComponent, TaskComponent, CommonModule],
  templateUrl: './project-page-container.html',
  styleUrl: './project-page-container.scss'
})
export class ProjectPageContainer {
  public shouldDetailsBeShown = false;
  public selectedProjectSubject = new BehaviorSubject<ProjectPO | null>(null);
  selectedProject$ = this.selectedProjectSubject.asObservable();



  showDetails(show: boolean) {
    console.log("showDetails: ", show);
    this.shouldDetailsBeShown = show;
  }

  showTasks(project: ProjectPO) {
    this.selectedProjectSubject.next(project);
  }

}


