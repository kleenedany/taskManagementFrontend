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
  readonly title = new FormControl('', [Validators.required]);
  readonly dialogRef = inject(MatDialogRef<CreateUpdateProjectDialogComponent>);
  data = inject(MAT_DIALOG_DATA);
  public showCreateDialog: boolean = true;
  public projectTitle: String | undefined;


   constructor(private projectService: ProjectControllerService) {}
 
   async ngOnInit(): Promise<void> {
    if(this.data && this.data.projectId) {
      this.showCreateDialog = false;
      
      const project = await firstValueFrom(this.projectService.loadProject(this.data.projectId));
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
       await firstValueFrom(this.projectService.updateProject(this.data.projectId, project));
    }
    
     this.dialogRef.close();

    }
  }
}
