import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDetailsComponent } from '../task-details-component/task-details-component';
import { ProjectDto, TaskDto } from '../../../../api/model';
import { TaskControllerService } from '../../../../api/task-controller/task-controller.service.gen';
import { ProjectControllerService } from '../../../../api/project-controller/project-controller.service.gen';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';
import { CreateUpdateTaskDialogComponent } from '../create-update-task-dialog-component/create-update-task-dialog-component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-component',
  imports: [MatButtonModule, MatListModule, FormsModule, ReactiveFormsModule, TaskDetailsComponent, MatIconModule, MatGridListModule, CommonModule],
  templateUrl: './task-component.html',
  styleUrl: './task-component.scss'
})
export class TaskComponent {
  readonly createTaskDialog = inject(MatDialog);
  public tasks: TaskDto[] | undefined = [];
  taskForm: FormGroup;
  taskControl = new FormControl();
  public selectedTaskSubject = new BehaviorSubject<TaskDto | null>(null);
  public selectedProject: ProjectDto | null | undefined;
  public selectedTask$ = this.selectedTaskSubject.asObservable();
  private _changeDetection = inject(ChangeDetectorRef);


  @Input() set project(value: ProjectDto | null) {
    this.tasks = []
    this.selectedProject = value;
    this.tasks = value?.tasks;
    this._changeDetection.detectChanges();
    this._updateProject();
  }

  constructor(private taskService: TaskControllerService,
    private projectService: ProjectControllerService,
  ){
    this.taskForm = new FormGroup({
      tasks: this.taskControl, 
    })
  }

  public openCreateTaskDialog() {
    const dialogRef = this.createTaskDialog.open(CreateUpdateTaskDialogComponent, {
      data: {
        project: this.selectedProject
      }
    });

    dialogRef.afterClosed().subscribe(async () => {
      await this._updateTasks();
    });
  }

  public async onChange(taskId: number | undefined) {
    if(taskId) {
      const taskDetails = await firstValueFrom(this.taskService.loadTask(taskId));
      this.selectedTaskSubject.next(taskDetails);
    }
  }

  public async updateTask(task: TaskDto) {
    await this._updateTasks();
  }

  private async _updateTasks() {
    try {
      if(this.selectedProject?.id) {
        const updatedProject = await firstValueFrom(this.projectService.loadProject(this.selectedProject?.id));
        this.project = { ...updatedProject};
        if(updatedProject.tasks) {
            this.tasks = [ ...updatedProject.tasks];
            this.tasks.forEach((task) => {
              if(this.selectedTaskSubject.value?.id === task.id) {
                this.taskControl.setValue(task.id);
              }
            })
        }
      }
      this._changeDetection.detectChanges();
    } catch(error) {
      console.error("Error loading task: ", error);
    }
  }

  private _updateProject(): void {
    this.tasks = this.selectedProject?.tasks ?? [];
  }
}
