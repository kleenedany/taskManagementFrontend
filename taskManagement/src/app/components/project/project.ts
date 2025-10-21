import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ProjectControllerService } from '../../api/project-controller/project-controller.service.gen';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProjectComponent } from '../project-component/project-component';

@Component({
  selector: 'app-project',
  imports: [MatSidenavModule, ProjectComponent],
  templateUrl: './project.html',
  styleUrl: './project.scss'
})
export class Project {

}


