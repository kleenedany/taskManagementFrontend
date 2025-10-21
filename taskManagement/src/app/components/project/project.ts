import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ProjectControllerService } from '../../api/project-controller/project-controller.service.gen';

@Component({
  selector: 'app-project',
  imports: [],
  templateUrl: './project.html',
  styleUrl: './project.scss'
})
export class Project implements OnInit {

  constructor(private projectService: ProjectControllerService) {

  }

  async ngOnInit(): Promise<void> {

   console.log("testOnInit");
  
    const testProjects = await firstValueFrom(this.projectService.loadAllProjects());
    console.log("test get Projects: ", testProjects);
  }



}


