import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TaskControllerService } from '../../api/task-controller/task-controller.service.gen';
import { ProjectPO, TaskPO } from '../../api/model';
import { lastValueFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-create-task-dialog-component',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './create-task-dialog-component.html',
  styleUrl: './create-task-dialog-component.scss'
})
export class CreateTaskDialogComponent {
  readonly title = new FormControl('', [Validators.required]);
  readonly description = new FormControl('', [Validators.required]);
  readonly dialogRef = inject(MatDialogRef<CreateTaskDialogComponent>);
  data = inject(MAT_DIALOG_DATA);
  
  constructor(private taskService: TaskControllerService) {}

  public async saveTask(): Promise<void> {
    if(this.title.value && this.description.value) {
      const task: TaskPO = {
      title: this.title.value,
      description: this.description.value,
      project: this.data.project,
      }
      const created = await lastValueFrom(this.taskService.createTask(task));
      console.log("created: ", created);

      this.dialogRef.close();

    }

  }

}
