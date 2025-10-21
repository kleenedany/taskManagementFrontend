import { Component, inject, Input } from '@angular/core';
import { DeleteTaskDialogComponent } from '../delete-task-dialog-component/delete-task-dialog-component';
import { EditTaskDialogComponent } from '../edit-task-dialog-component/edit-task-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectPO, TaskPO } from '../../api/model';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-task-details-component',
  imports: [MatButtonModule],
  templateUrl: './task-details-component.html',
  styleUrl: './task-details-component.scss'
})
export class TaskDetailsComponent {
    readonly deleteTaskDialog = inject(MatDialog);
  readonly editTaskDialog = inject(MatDialog);
  task: TaskPO | undefined;
  project: ProjectPO | undefined | null;

  @Input()
  set selectedTask(value: TaskPO | undefined) {
    console.log("set selected task: ", value);
    this.task = value;
  }

  @Input()
  set selectedProject(value: ProjectPO | undefined | null) {
    this.project = value;
  }
   

    public openDeleteTaskDialog() {
      console.log("openDeleteTask Dialog: ", this.task);
    this.deleteTaskDialog.open(DeleteTaskDialogComponent, {
      
      data: {
        taskId: this.task?.id,
        project: this.project
      }
    });
  }

  public openEditTaskDialog() {
    this.editTaskDialog.open(EditTaskDialogComponent, {
      data: {
        taskId: this.task?.id
      }
    });

  }

}
