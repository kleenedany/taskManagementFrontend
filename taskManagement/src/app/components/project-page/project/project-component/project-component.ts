import { ChangeDetectorRef, Component, EventEmitter, inject, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import { CreateUpdateProjectDialogComponent } from '../create-update-project-dialog-component/create-update-project-dialog-component';
import { firstValueFrom } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { DeleteProjectDialog } from '../delete-project-dialog/delete-project-dialog';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectDto } from '../../../../api/model';
import { ProjectControllerService } from '../../../../api/project-controller/project-controller.service.gen';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-project-component',
  imports: [MatButtonModule, MatListModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './project-component.html',
  styleUrl: './project-component.scss'
})
export class ProjectComponent implements OnInit {
  public projects: ProjectDto[] = [];
  public projectForm: FormGroup;
  public projectsControl = new FormControl();

  private readonly _createProjectDialog = inject(MatDialog);
  private readonly _deleteProjectDialog = inject(MatDialog);
  private readonly _editProjectDialog = inject(MatDialog);
  private _changeDetection = inject(ChangeDetectorRef);

  @Output() 
  selectedProject = new EventEmitter<ProjectDto>();

  constructor(private _projectService: ProjectControllerService) {
    this.projectForm = new FormGroup({
      projects: this.projectsControl,
    });
  }

  public openCreateProjectDialog() {
    const dialogRef = this._createProjectDialog.open(CreateUpdateProjectDialogComponent);

    dialogRef.afterClosed().subscribe(async () => {
      await this._loadProjects();
    })
  }

  public openDeleteProjectDialog() {
    const dialogRef = this._deleteProjectDialog.open(DeleteProjectDialog, {
      data: {
        projectId: this.projectsControl.value
      }
    });

    dialogRef.afterClosed().subscribe(async () => {
      await this._loadProjects();
    });
  }

  public openEditProjectDialog() {
    const dialogRef = this._editProjectDialog.open(CreateUpdateProjectDialogComponent, {
      data: {
        projectId: this.projectsControl.value
      }
    });

    dialogRef.afterClosed().subscribe(async () => {
      await this._loadProjects();
    });
  }

  public onChange(projectId: number | undefined) {
    if(projectId) {
      let project: ProjectDto | undefined;
      this.projects.forEach(_project => {
        if(_project.id === projectId) {
          project = _project;
        }
      });
      this.selectedProject.emit(project);
    }
  }


  public async ngOnInit(): Promise<void> {
    await this._loadProjects();
  }

  private async _loadProjects() {
  try {
        this.projects = await firstValueFrom(this._projectService.loadAllProjects());
        this._changeDetection.detectChanges();
      } catch(error) {
        console.error("Error loading projects: ", error);
      }
  }
}
