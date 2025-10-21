import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProjectControllerService } from '../../api/project-controller/project-controller.service.gen';
import { ProjectPO } from '../../api/model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-update-project-dialog',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-project-dialog.html',
  styleUrl: './update-project-dialog.scss'
})
export class UpdateProjectDialog {
  readonly title = new FormControl('', [Validators.required]);
  readonly dialogRef = inject(MatDialogRef<UpdateProjectDialog>);
  data = inject(MAT_DIALOG_DATA);

  constructor(private projectService: ProjectControllerService) {}

  public async saveProject(): Promise<void> {
    if(this.title.value) {
      const project:  ProjectPO = {
        name: this.title.value,
        tasks: [],
      }

      const updated = await firstValueFrom(this.projectService.updateProject(this.data.projectId, project));
      console.log("updated: ", updated);

      this.dialogRef.close();
    }
  }

}
