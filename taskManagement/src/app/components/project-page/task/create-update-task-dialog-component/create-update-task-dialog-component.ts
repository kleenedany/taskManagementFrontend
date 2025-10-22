import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TaskControllerService } from '../../../../api/task-controller/task-controller.service.gen';
import { TaskDto, TaskDtoStatus, UserDto } from '../../../../api/model';
import { UserControllerService } from '../../../../api/user-controller/user-controller.service.gen';

@Component({
  selector: 'app-create-task-dialog-component',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './create-update-task-dialog-component.html',
  styleUrl: './create-update-task-dialog-component.scss'
})
export class CreateUpdateTaskDialogComponent implements OnInit {
  readonly title = new FormControl('', [Validators.required]);
  readonly description = new FormControl('');
  readonly dialogRef = inject(MatDialogRef<CreateUpdateTaskDialogComponent>);
  data = inject(MAT_DIALOG_DATA);
  public statusEnum = Object.values(TaskDtoStatus);
  public selectedStatus: TaskDtoStatus | undefined;
  public userList: UserDto[] = [];
  public selectedUser: UserDto[] = []; 
  public showCreateDialog: boolean = true;
  public taskTitle: string | undefined;
  public taskDescription: string | undefined;
 

  constructor(private taskService: TaskControllerService, private userService: UserControllerService) {}

  async ngOnInit(): Promise<void> {
    this.userList = await firstValueFrom(this.userService.loadAllUsers());
    if(this.data && this.data.task) {
      this.showCreateDialog = false;
      this.taskTitle = this.data.task.title;
      this.taskDescription = this.data.task.title;
      this.selectedStatus = this.data.task.status;
      this.selectedUser = this.data.task.users;
     
    }
  }

  public async saveTask(): Promise<void> {
    if(this.title.value) {
      const task: TaskDto = {
      title: this.title.value,
      description: this.description.value as string | undefined,
      projectId: this.data.project.id,
      status: this.selectedStatus,
      users: this.selectedUser,
      }

      if(this.showCreateDialog) {
        await firstValueFrom(this.taskService.createTask(this.data.project.id, task));
      } else {
         await firstValueFrom(this.taskService.updateTask(this.data.taskId, task));
      } 
      
      this.dialogRef.close();
    }
  }

}
