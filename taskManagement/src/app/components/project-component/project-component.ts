import { Component, EventEmitter, inject, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProjectControllerService } from '../../api/project-controller/project-controller.service.gen';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import { CreateProjectDialogComponent } from '../create-project-dialog-component/create-project-dialog-component';
import { ProjectPO } from '../../api/model';
import { firstValueFrom } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { DeleteProjectDialog } from '../delete-project-dialog/delete-project-dialog';
import { UpdateProjectDialog } from '../update-project-dialog/update-project-dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-component',
  imports: [MatButtonModule, MatListModule, FormsModule, ReactiveFormsModule],
  templateUrl: './project-component.html',
  styleUrl: './project-component.scss'
})
export class ProjectComponent implements OnInit {
  public projects = new Set<ProjectPO>;
  projectForm: FormGroup;
  projectsControl = new FormControl();

  @Output() showProjectDetails = new EventEmitter<boolean>();
  @Output() selectedProject = new EventEmitter<ProjectPO>();

  readonly createProjectDialog = inject(MatDialog);
  readonly deleteProjectDialog = inject(MatDialog);
  readonly editProjectDialog = inject(MatDialog);
  
  constructor(private projectService: ProjectControllerService) {
    this.projectForm = new FormGroup({
      projects: this.projectsControl,
    });
  }


  public openCreateProjectDialog() {
    this.createProjectDialog.open(CreateProjectDialogComponent);
  }

  public openDeleteProjectDialog() {
    this.deleteProjectDialog.open(DeleteProjectDialog, {
      data: {
        projectId: this.projectsControl.value
      }
    });
  }

  public openEditProjectDialog() {
    this.editProjectDialog.open(UpdateProjectDialog, {
      data: {
        projectId: this.projectsControl.value
      }
    });
  }

  public onChange(projectId: number | undefined) {
    if(projectId) {
      let project: ProjectPO | undefined;
      this.projects.forEach(project_ => {
        if(project_.id === projectId) {
          project = project_;
        }
      });
      this.showProjectDetails.emit(true);
      this.selectedProject.emit(project);
    }
  }


  async ngOnInit(): Promise<void> {
    this.projects = await firstValueFrom(this.projectService.loadAllProjects());
    console.log("projects: ", this.projects);

    
  }

}
