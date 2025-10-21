import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ProjectControllerService } from '../../api/project-controller/project-controller.service.gen';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProjectComponent } from '../project-component/project-component';
import { TaskComponent } from '../task-component/task-component';
import { CommonModule } from '@angular/common';
import { ProjectPO } from '../../api/model';

@Component({
  selector: 'app-project',
  imports: [MatSidenavModule, ProjectComponent, TaskComponent, CommonModule, TaskComponent],
  templateUrl: './project.html',
  styleUrl: './project.scss'
})
export class Project {
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


