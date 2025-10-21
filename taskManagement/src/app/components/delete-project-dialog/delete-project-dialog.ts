import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProjectControllerService } from '../../api/project-controller/project-controller.service.gen';
import { firstValueFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-delete-project-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-project-dialog.html',
  styleUrl: './delete-project-dialog.scss'
})
export class DeleteProjectDialog {
  data = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<DeleteProjectDialog>);

  constructor(private projectService: ProjectControllerService){}
  
  public async deleteProject(): Promise<void> {

    if(this.data.projectId) {
    await firstValueFrom(this.projectService.deleteProject(this.data.projectId));
    }

    this.dialogRef.close();
  }

  


}
