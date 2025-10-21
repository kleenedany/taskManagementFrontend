import { Component, inject, Input, OnInit } from '@angular/core';
import { TaskControllerService } from '../../api/task-controller/task-controller.service.gen';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../create-task-dialog-component/create-task-dialog-component';
import { DeleteTaskDialogComponent } from '../delete-task-dialog-component/delete-task-dialog-component';
import { EditTaskDialogComponent } from '../edit-task-dialog-component/edit-task-dialog-component';
import { ProjectPO, TaskPO } from '../../api/model';
import { firstValueFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { ProjectControllerService } from '../../api/project-controller/project-controller.service.gen';
import { MatListModule } from '@angular/material/list';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDetailsComponent } from '../task-details-component/task-details-component';

@Component({
  selector: 'app-task-component',
  imports: [MatButtonModule, MatListModule, FormsModule, ReactiveFormsModule, TaskDetailsComponent],
  templateUrl: './task-component.html',
  styleUrl: './task-component.scss'
})
export class TaskComponent {
  readonly createTaskDialog = inject(MatDialog);
  public tasks = new Set<TaskPO>;
  taskForm: FormGroup;
  taskControl = new FormControl();
  public selectedProject: ProjectPO | null | undefined;
  public selectedTask: TaskPO | undefined;

  @Input() set project(value: ProjectPO | null) {
    console.log("project: ", value);
    this.selectedProject = value;
    value?.tasks?.forEach((task) => {
      this.tasks.add(task);
    })

  }

  constructor(private taskService: TaskControllerService,
    private projectService: ProjectControllerService,
  ){
    this.taskForm = new FormGroup({
      tasks: this.taskControl, 
    })
  }


  public openCreateTaskDialog() {
    this.createTaskDialog.open(CreateTaskDialogComponent, {
      data: {
        project: this.selectedProject
      }
    });
  }

  public onChange(taskId: number | undefined) {
    console.log("task Change before foreach");
    this.tasks.forEach((task) => {
      console.log("task Change in foreach");
      if(task.id === taskId) {
        console.log("on Task Change: ", task);
        this.selectedTask = task;
      }
    })
  }

}
