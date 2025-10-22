import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { TaskControllerService } from '../../../../api/task-controller/task-controller.service.gen';

@Component({
  selector: 'app-delete-task-dialog-component',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-task-dialog-component.html',
  styleUrl: './delete-task-dialog-component.scss'
})
export class DeleteTaskDialogComponent {
  public data = inject(MAT_DIALOG_DATA);
  private readonly _dialogRef = inject(MatDialogRef<DeleteTaskDialogComponent>);

  constructor(private taskService: TaskControllerService){}

  public async deleteTask(): Promise<void> {
    if(this.data.taskId) {
      await firstValueFrom(this.taskService.deleteTask(this.data.taskId));
    }

    this._dialogRef.close();
  }

}
