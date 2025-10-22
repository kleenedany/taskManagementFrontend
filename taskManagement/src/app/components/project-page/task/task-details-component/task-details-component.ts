import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { DeleteTaskDialogComponent } from '../delete-task-dialog-component/delete-task-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ProjectDto, TaskDto } from '../../../../api/model';
import { CreateUpdateTaskDialogComponent } from '../create-update-task-dialog-component/create-update-task-dialog-component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TaskControllerService } from '../../../../api/task-controller/task-controller.service.gen';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-task-details-component',
  imports: [MatButtonModule, MatChipsModule, MatIconModule],
  templateUrl: './task-details-component.html',
  styleUrl: './task-details-component.scss'
})
export class TaskDetailsComponent{

  readonly deleteTaskDialog = inject(MatDialog);
  readonly editTaskDialog = inject(MatDialog);
  task: TaskDto | undefined | null;
  project: ProjectDto | undefined | null;

  @Input()
  set selectedTask(value: TaskDto | null) {
      this.task = value;
  }

  @Input()
  set selectedProject(value: ProjectDto | undefined | null) {
    this.project = value;
  }

  @Output()
  updateTask = new EventEmitter<TaskDto>();

  constructor(private _taskService: TaskControllerService) {

  }
   

    public openDeleteTaskDialog() {
    this.deleteTaskDialog.open(DeleteTaskDialogComponent, {
      data: {
        taskId: this.task?.id,
        project: this.project
      }
    });
  }

  public openEditTaskDialog() {
    const dialogRef = this.editTaskDialog.open(CreateUpdateTaskDialogComponent, {
      data: {
        taskId: this.task?.id,
        project: this.project,
        task: this.task,
      }
    });

    dialogRef.afterClosed().subscribe(async () => {
      await this._updateTaskDetails();
      if(this.task) {
        this.updateTask.emit(this.task);
      }
    });
  }

  private async _updateTaskDetails() {
    if(this.task && this.task.id) {
      const updatedTask = await firstValueFrom(this._taskService.loadTask(this.task.id));
      this.task = updatedTask;
    }
    
  }

}
