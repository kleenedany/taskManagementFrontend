import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../create-task-dialog-component/create-task-dialog-component';
import { TaskControllerService } from '../../api/task-controller/task-controller.service.gen';
import { TaskDto, TaskPO } from '../../api/model';
import { lastValueFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-task-dialog-component',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './edit-task-dialog-component.html',
  styleUrl: './edit-task-dialog-component.scss'
})
export class EditTaskDialogComponent {
   readonly title = new FormControl('', [Validators.required]);
  readonly description = new FormControl('', [Validators.required]);
  readonly dialogRef = inject(MatDialogRef<CreateTaskDialogComponent>);
  data = inject(MAT_DIALOG_DATA);
  
  constructor(private taskService: TaskControllerService) {}

  public async saveTask(): Promise<void> {
    if(this.title.value && this.description.value) {
      const task: TaskDto= {
      title: this.title.value,
      description: this.description.value,
      projectId: this.data.project.id,
      }
      const created = await lastValueFrom(this.taskService.updateTask(this.data.taskId, task));
      console.log("created: ", created);

      this.dialogRef.close();

    }

  }

}
