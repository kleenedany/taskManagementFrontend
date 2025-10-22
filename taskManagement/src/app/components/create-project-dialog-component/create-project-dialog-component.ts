import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProjectControllerService } from '../../api/project-controller/project-controller.service.gen';
import { ProjectPO } from '../../api/model';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-project-dialog-component',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-project-dialog-component.html',
  styleUrl: './create-project-dialog-component.scss'
})
export class CreateProjectDialogComponent {
  readonly title = new FormControl('', [Validators.required]);
  readonly dialogRef = inject(MatDialogRef<CreateProjectDialogComponent>);

   constructor(private projectService: ProjectControllerService) {}

  public async saveProject(): Promise<void> {
    if(this.title.value) {
        const project: ProjectPO = {
        title: this.title.value,
        tasks: [],
    }
   
     const created = await lastValueFrom( this.projectService.createProject(project, {
    headers: { 'Content-Type': 'application/json' }
  }));
     console.log("created: ", created);

     this.dialogRef.close();

    }
  

    ;
    

  }

}
