import { Component, inject, Input, OnInit } from '@angular/core';
import { DeleteTaskDialogComponent } from '../delete-task-dialog-component/delete-task-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ProjectDto, TaskDto } from '../../../../api/model';
import { CreateUpdateTaskDialogComponent } from '../create-update-task-dialog-component/create-update-task-dialog-component';


@Component({
  selector: 'app-task-details-component',
  imports: [MatButtonModule],
  templateUrl: './task-details-component.html',
  styleUrl: './task-details-component.scss'
})
export class TaskDetailsComponent{

    readonly deleteTaskDialog = inject(MatDialog);
  readonly editTaskDialog = inject(MatDialog);
  task: TaskDto | undefined;
  project: ProjectDto | undefined | null;

  @Input()
  set selectedTask(value: TaskDto | undefined) {
      this.task = value;
  }

  @Input()
  set selectedProject(value: ProjectDto | undefined | null) {
    this.project = value;
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
    this.editTaskDialog.open(CreateUpdateTaskDialogComponent, {
      data: {
        taskId: this.task?.id,
        project: this.project,
        task: this.task,
      }
    });

  }

}
