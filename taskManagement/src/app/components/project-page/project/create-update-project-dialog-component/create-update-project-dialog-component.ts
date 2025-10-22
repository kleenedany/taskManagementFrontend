import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { ProjectControllerService } from '../../../../api/project-controller/project-controller.service.gen';
import { ProjectDto } from '../../../../api/model';

@Component({
  selector: 'app-create-project-dialog-component',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-update-project-dialog-component.html',
  styleUrl: './create-update-project-dialog-component.scss'
})
export class CreateUpdateProjectDialogComponent implements OnInit {
  public title = new FormControl('', [Validators.required]);
  private readonly _dialogRef = inject(MatDialogRef<CreateUpdateProjectDialogComponent>);
  private _data = inject(MAT_DIALOG_DATA);
  public showCreateDialog: boolean = true;
  public projectTitle: String | undefined;


   constructor(private projectService: ProjectControllerService) {}
 
   public async ngOnInit(): Promise<void> {
    if(this._data && this._data.projectId) {
      this.showCreateDialog = false;
      
      const project = await firstValueFrom(this.projectService.loadProject(this._data.projectId));
      this.projectTitle = project.title;
    }
  }

  public async saveProject(): Promise<void> {
    if(this.title.value) {
        const project: ProjectDto = {
        title: this.title.value,
    }
   
    if(this.showCreateDialog) {
       await firstValueFrom( this.projectService.createProject(project));
    } else {
       await firstValueFrom(this.projectService.updateProject(this._data.projectId, project));
    }
     this._dialogRef.close();
    }
  }
}
